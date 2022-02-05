const { join } = require('path');

const absolute = paths => (Array.isArray(paths)
  ? paths
  : [paths]
).map(path => join(process.cwd(), path));

module.exports = {
  apps: [{
    name: 'clark-ws',
    autorestart: false,
    ignore_watch: ['node_modules'],
    script: absolute(['./index.js'])[0],
    cwd: absolute('.')[0],
    instances: 2,
    exec_mode: 'cluster',
  }],
};
