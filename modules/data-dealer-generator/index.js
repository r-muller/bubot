/* eslint-disable max-len */
const fs = require('fs').promises;
const path = require('path');
const database = require('../utils/knex');
const relationNames = require('./relationNames');
const extend = require('./extends');
const tableIdColumn = require('./tableIdColumn');

const {
  pks,
  keys,
  // keysMapper,
  camelToPascal,
  toCamel,
} = require('./utils');

const { template, packageJsonTemplate } = require('./template');

const context = {};

const generateTemplate = () => Promise.resolve()
  .then(() => fs.rmdir(path.join(__dirname, '../data-dealer'), { recursive: true }))
  .then(() => fs.mkdir(path.join(__dirname, '../data-dealer'), { recursive: true }))
  .then(() => fs.writeFile(path.join(__dirname, '../data-dealer/package.json'), packageJsonTemplate()))
  .then(() => Promise.all(Object.values(context.rewamp)
    .map((data) => {
      const { relations, className, table } = data;
      const columnData = context.keys[table];

      const rs = relations
        .map((r) => {
          const { name, relationType } = r;
          if (!relationNames[className]) return r;
          if (!relationNames[className][name]) return r;
          return {
            ...r,
            name: relationNames[className][name].rename ? relationNames[className][name].rename : name,
            relationType: relationNames[className][name].relation ? relationNames[className][name].relation : relationType,
          };
        });

      const ext = extend[className] ? extend[className] : [];

      const ids = tableIdColumn[className] ? tableIdColumn[className] : null;

      return {
        ...data,
        columnsType: columnData ? columnData.columns : [],
        columns: columnData ? columnData.columns.map(c => c.columnName) : [],
        relations: [...rs, ...ext],
        ids
      };
    })
    .map(data => fs.writeFile(path.join(__dirname, `../data-dealer/${data.className}.js`), template(data)))));

return Promise.resolve()
  .then(() => pks(database))
  .then(({ rows }) => {
    context.pks = rows;
  })
  .then(() => keys(database))
  .then((rows) => {
    context.keys = rows;
  })
  .then(() => {
    const res = context.pks
      .map((row) => {
        const {
          schema,
          table_name: pkTable,
          field_name: pkName,
          references_table: fkTable,
          reference_schema: referenceSchema,
          references_field: fkName,
        } = row;
        return ({
          schema,
          pkTable: toCamel(pkTable),
          pkName: toCamel(pkName),
          fkTable: toCamel(fkTable),
          referenceSchema,
          fkName: toCamel(fkName),
        });
      })
      .reduce((acc, row) => {
        const {
          pkTable,
          pkName,
          fkTable,
          fkName,
          schema,
          referenceSchema,
        } = row;

        const relation = pkName && fkTable
          ? {
            name: `from${camelToPascal(pkTable)}Table${camelToPascal(pkName)}To${camelToPascal(fkTable)}Table${camelToPascal(fkName)}`,
            from: { schema, table: pkTable, field: pkName },
            to: { schema: referenceSchema, table: fkTable, field: fkName },
            relationType: 'ManyToManyRelation',
            modelClass: camelToPascal(fkTable),
          }
          : null;
        if (!acc[pkTable]) {
          acc[pkTable] = {
            table: pkTable,
            schema,
            className: camelToPascal(pkTable),
            id: pkName,
            pks: [pkName],
            hasFK: !!fkTable,
            fkTable: fkTable ? [fkTable] : [],
            fks: fkName ? [fkName] : [],
            relations: relation ? [relation] : [],
          };
          return acc;
        }

        acc[pkTable] = {
          ...acc[pkTable],
          id: pkName,
          schema,
          pks: [...acc[pkTable].pks, pkName],
          hasFK: acc[pkTable].hasFK || !!fkTable,
          fkTable: [...acc[pkTable].fkTable, fkTable],
          fks: [...acc[pkTable].fks, fkName],
          relations: relation ? [...acc[pkTable].relations, relation] : acc[pkTable].relations,
        };
        return acc;
      }, {});

    const rewamp = Object.values(res)
      .reduce((acc, t) => {
        const {
          table: currentTable,
          relations,
          ...rest
        } = t;
        relations.forEach((r) => {
          const {
            to: { table },
          } = r;
          const reverseRelation = {
            name: `from${camelToPascal(r.to.table)}Table${camelToPascal(r.to.field)}To${camelToPascal(r.from.table)}Table${camelToPascal(r.from.field)}`,
            from: { ...r.to },
            to: { ...r.from },
            relationType: 'HasManyRelation',
            modelClass: camelToPascal(r.from.table),
          };
          if (!acc[table]) {
            acc[table] = {
              ...rest,
              ...res[table],
              relations: [...res[table].relations, reverseRelation],
            };
            return acc;
          }
          acc[table] = {
            ...rest,
            ...acc[table],
            relations: [...acc[table].relations, reverseRelation],
          };
          return acc;
        });
        if (!acc[currentTable]) {
          acc[currentTable] = {
            ...rest,
            ...res[currentTable],
          };
          return acc;
        }
        return acc;
      }, {});

    context.rewamp = rewamp;
  })

  .then(() => generateTemplate(context))
  .then(() => {
    database.destroy();
  });
