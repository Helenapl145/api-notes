const path = require("path")


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'roundhouse.proxy.rlwy.net',
      port: '38238',
      database: 'railway',
      user: 'root',
      password: 'D35aGaFc1H6hAb5h3hFGA2h2aHFbHF5E'
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