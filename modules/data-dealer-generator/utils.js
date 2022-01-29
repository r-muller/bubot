const toCamel = s => (s && s.length
  ? s.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''))
  : s);

const camelToPascal = s => s.replace(/([A-Z])/g, '$1').charAt(0).toUpperCase() + s.slice(1);

const pks = db => db
  .raw(`
SELECT
pt.schemaname as schema,
t.relname AS table_name,
a.attname AS field_name,
t2.relname AS references_table,
pt2.schemaname as reference_schema,
a2.attname AS references_field
FROM pg_constraint c
  LEFT JOIN pg_class t  ON c.conrelid  = t.oid
  LEFT JOIN pg_tables pt ON t.relname = pt.tablename
  LEFT JOIN pg_class t2 ON c.confrelid = t2.oid
  LEFT JOIN pg_tables pt2 ON t2.relname = pt2.tablename
  LEFT JOIN pg_attribute a ON t.oid = a.attrelid AND a.attnum = c.conkey[1]
  LEFT JOIN pg_attribute a2 ON t2.oid = a2.attrelid AND a2.attnum = c.confkey[1]
  WHERE t.relname IS NOT NULL
  `);

// const keys = db => db
// .select('tableName', 'columnName', 'udtName')
// .from('information_schema.columns')
// .where({
//   table_catalog: 'Arthur',
//   table_schema: 'public',
// });
const keys = db => db
  // .withSchema('sales')
  // .select('table_name')
  // .from('information_schema.tables')
  // .where({ table_catalog: 'Arthur' })
  // .select()
  // .from('sales.user')
  // .then((response) => {
  //   console.log('🚀 ~ file: utils.js ~ line 41 ~ .then ~ response', response);
  //   return response;
  // })
  // .raw(`SELECT table_name FROM information_schema.tables  WHERE  table_catalog = 'Arthur'`)
  .raw(`SELECT schemaname, tablename AS table_name FROM pg_tables WHERE schemaname = 'sales' OR schemaname = 'public'`)
  .then(({ rows: tables }) => Promise.all(tables.map(({ schemaname, table_name: tableName }) => db.withSchema(schemaname).table(`${tableName}`)
    .columnInfo()
    .then(res => Object.entries(res)
      .reduce((acc, [columnName, { type }]) => {
        if (!acc[toCamel(tableName)]) {
          acc[toCamel(tableName)] = [{ columnName, type, schema: schemaname }];
          return acc;
        }
        acc[toCamel(tableName)].push({ columnName, type, schema: schemaname });
        return acc;
      }, {}))))
    .then(res => res
      .reduce((acc, r) => {
        const [tableName] = Object.keys(r);
        const [columns] = Object.values(r);

        acc[tableName] = { columns };
        return acc;
      }, {})));

const keysMapper = data => data
  .map((obj) => {
    const {
      // schema,
      tableName,
      columnName,
      udtName: type,
    } = obj;
    return {
      type,
      // schema,
      tableName: toCamel(tableName),
      columnName: toCamel(columnName),
    };
  })
  .reduce((acc, row) => {
    const { tableName, columnName, type } = row;
    if (!acc[tableName]) {
      acc[tableName] = { tableName, columns: [{ columnName, type }] };
      return acc;
    }
    acc[tableName].columns.push({ columnName, type });
    return acc;
  }, {});

const indent = (sp, str) => str.replace(/(\n\r?)(?!^$)/gm, `$1${new Array(sp).fill(' ').join('')}`);

module.exports = {
  pks,
  keys,
  keysMapper,
  camelToPascal,
  toCamel,
  indent,
};
