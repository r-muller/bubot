const toCamel = s => s.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const isArray = a => Array.isArray(a);

const isObject = o => o === Object(o) && !isArray(o) && typeof o !== 'function';

const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  }
  if (isArray(o)) {
    return o.map(i => keysToCamel(i));
  }

  if (typeof o === 'string' && o.match(/([-_][a-z])/ig)) {
    return toCamel(o);
  }

  return o;
};

const toJSON = obj => keysToCamel(JSON.parse(JSON.stringify(obj)));

const objToString = obj => Object
  .entries(obj)
  .reduce((acc, [p, val]) => {
    if (isObject(val)) return [...acc, `${p}:"${objToString(val)}"`];
    return [...acc, `${p}:${val}`];
  }, [])
  .join(' ');

const faltifyEdgesWithNode = (value) => {
  console.log('🚀 ~ file: helper.js ~ line 41 ~ faltifyEdgesWithNode ~ value', value);
  if (!isArray(value)) return value;
  const edges = value;
  if (!edges || !isArray(edges)) return value;
  if (edges.find(({ node }) => !node)) return value;
  return edges.map(({ node }) => ({ ...node }));
};

const parseObject = (obj) => {
  console.log('🚀 ~ file: helper.js ~ line 51 ~ parseObject ~ obj', obj);
  if (!isObject(obj)) return obj;
  return Object.fromEntries(new Map(Object.entries(obj)
    .map(([key, value]) => {
      console.log('🚀 ~ file: helper.js ~ line 77 ~ .map ~ key', key);
      console.log('🚀 ~ file: helper.js ~ line 70 ~ .map ~ value', value);
      return [key, faltifyEdgesWithNode(value)];
    })));
};

const parseList = array => array
  .map(item => Object.fromEntries(new Map(Object.entries(item)
    .map(([key, value]) => {
      console.log('🚀 ~ file: helper.js ~ line 71 ~ .map ~ key', key);
      console.log('🚀 ~ file: helper.js ~ line 71 ~ .map ~ value', value);
      if (!isObject(value)) return [key, value];
      return [key, parseObject(value)];
    }))));

const hasProperty = require('./hasProperty');

const arrayMapper = (array, key) => array.reduce((acc, entry) => {
  acc[entry[key]] = { ...entry };
  return acc;
}, {});

const viewFormater = data => (data
  ? Object.entries(data).reduce((acc, [key, val]) => {
    if (!key.includes('\\')) return { ...acc, [key]: val };
    const [object, field] = key.split('\\');
    return acc[object]
      ? { ...acc, [object]: { ...acc[object], [field]: val } }
      : { ...acc, [object]: { [field]: val } };
  }, {})
  : data);

const reduceByModel = array => array.reduce((acc, row) => {
  const idKey = require(`../data-dealer/${row.constructor.name}`).idColumn;

  // get all keys from object wich is an array
  const relations = Object.keys(row)
    .filter(column => (row[column] && Array.isArray(row[column]) ? column : undefined));

  acc[row[idKey]] = {
    ...row,
    // for keys wich are array we have to convert to map
    ...relations.reduce((ac, r) => {
      // generating array of relation in order to build relation table in app
      ac[`${r}Relations`] = row[r].map((child) => {
        const childIdKey = require(`../data-dealer/${child.constructor.name}`).idColumn;

        return {
          [idKey]: row[idKey],
          [childIdKey]: child[childIdKey],
        };
      });
      // recurse for each array
      ac[r] = reduceByModel(row[r]);
      return ac;
    }, {}),
  };

  return acc;
}, {});

const formateDataToApi = (httpQuery, response) => {
  if (httpQuery && hasProperty(httpQuery, 'appFriendly')) {
    return reduceByModel(response);
  }
  return response;
};

const formateArrayFromApi = ({ httpQuery }, key) => (array) => {
  if (httpQuery && hasProperty(httpQuery, 'appFriendly')) {
    return arrayMapper(array, key);
  }
  return array;
};

const platformNameTranslater = (name, isLongVersion = true) => {
  if (isLongVersion) {
    switch (name) {
      case 'ig': return 'INSTAGRAM';
      case 'tk': return 'TIK-TOK';
      case 'fb': return 'FACEBOOK';
      case 'ms': return 'MESSENGER';
      case 'yt': return 'YOUTUBE';
      default: return undefined;
    }
  }
  switch (name) {
    case 'INSTAGRAM': return 'ig';
    case 'TIK-TOK': return 'tk';
    case 'FACEBOOK': return 'fb';
    case 'MESSENGER': return 'ms';
    case 'YOUTUBE': return 'yt';
    default: return undefined;
  }
};

module.exports = {
  keysToCamel,
  toJSON,
  objToString,
  faltifyEdgesWithNode,
  parseObject,
  parseList,
  arrayMapper,
  hasProperty,
  // objectifyEntry,
  // objectifyEntries,
  formateDataToApi,
  viewFormater,
  platformNameTranslater,
  formateArrayFromApi,
};
