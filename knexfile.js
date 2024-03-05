const path = require("path")


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'monorail.proxy.rlwy.net',
      port: '55768',
      database: 'railway',
      user: 'root',
      password: 'BBgA5aff5dCA3c6--DGH2FCBAfA-C-Fh'
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};
/*
pool: {
  afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
}, */
