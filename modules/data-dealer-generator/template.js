const { indent } = require('./utils');

const buildId = (data) => {
  // console.log('🚀 ~ file: template.js ~ line 4 ~ buildId ~ data', data);
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return `[${data.map((columnName, index) => (index === 0 ? `'${columnName}'` : ` '${columnName}'`))}]`;
};

const formateExtra = (extra) => {
  if (!extra) return '[]';
  const values = extra.map(e => `'${e}'`).join(', ');
  return `[${values}]`;
};

const toStringArray = array => `[${Array.from(array)}]`;
const formateKeyPath = ({
  schema,
  table,
  fields,
  field,
}) => (fields
  ? toStringArray(fields.map((_field, index) => (index !== fields.length - 1 && index !== 0 ? ` '${schema}.${table}.${_field}'` : `'${schema}.${table}.${_field}'`)))
  : `['${schema}.${table}.${field}']`);

const buildRelations = data => data.map(r => (r.through
  ? `${r.name}: {
    relation: Model.${r.relationType},
    modelClass: path.join(__dirname, '${r.modelClass}'),
    join: {
      from: ${formateKeyPath(r.from)},
      through: {
        from: ${formateKeyPath(r.through.from)},
        to: ${formateKeyPath(r.through.to)},
        extra: ${formateExtra(r.through.extra)},
      },
      to: ${formateKeyPath(r.to)},
    },
  },\n
  `
  : `${r.name}: {
    relation: Model.${r.relationType},
    modelClass: path.join(__dirname, '${r.modelClass}'),
    join: {
      from: ${formateKeyPath(r.from)},
      to: ${formateKeyPath(r.to)},
    },
  },\n
  `));

const template = ({
  className,
  schema,
  table,
  id,
  columnsType,
  columns,
  relations,
  ids = null,
}) => (relations.length
  ? `/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */

const { Model, val } = require('objection');
const path = require('path');

const knex = require('@bubot/utils/knex');

Model.knex(knex);

module.exports = class ${className} extends Model {
  static get tableName() { return '${schema}.${table}'; }

  static get idColumn() { return ${buildId(ids || columns[0])}; }

  static get tableColumns() {
    return [${columns.map((columnName, index) => (index === 0 ? `'${columnName}'` : ` '${columnName}'`))}];
  }

  static get typeColumns() {
    return [
      ${indent(4, columnsType.map(({ columnName, type }) => `{ ${columnName}: '${type}' },\n`).join(''))}
    ];
  }

  static get relationMappings() {
    return {
      ${indent(4, buildRelations(relations).join(''))}
    };
  }

  static getOne({ payload, trx }) {
    const query = ${className}.query(trx)
      .findById(payload[${className}.idColumn]);

    return query;
  }

  static exists({ payload, trx }) {
    const query = ${className}.query(trx)
      .select(val(true))
      .findById(payload[${className}.idColumn]);

    return query
      .then(exists => ({ exists: Boolean(exists) }));
  }
};
`
  : `
/* eslint-disable indent */

const { Model, val } = require('objection');
// const path = require('path');

const knex = require('@bubot/utils/knex');

Model.knex(knex);

module.exports = class ${className} extends Model {
  static get tableName() { return '${schema}.${table}'; }

  static get idColumn() { return ${buildId(id)}; }

  static get tableColumns() {
    return [${columns.map((columnName, index) => (index === 0 ? `'${columnName}'` : ` '${columnName}'`))}];
  }

  static get typeColumns() {
    return [
      ${indent(4, columnsType.map(({ columnName, type }) => `{ ${columnName}: '${type}' },\n`).join(''))}
    ];
  }

  static getOne({ payload, trx }) {
    const query = ${className}.query(trx)
      .findById(payload[${className}.idColumn]);

    return query;
  }

  static exists({ payload, trx }) {
    const query = ${className}.query(trx)
      .select(val(true))
      .findById(payload[${className}.idColumn]);

    return query
      .then(exists => ({ exists: Boolean(exists) }));
  }
};
`);

const packageJsonTemplate = () => `{
  "name": "@bubot/data-dealer",
  "version": "0.0.1",
  "main": "index.js",
  "private": true,
  "engines": {
    "node": ">=12.0.0"
  },
  "dependencies": {
    "objection": "^2.2.15"
  }
}
`;

module.exports = { template, packageJsonTemplate };
