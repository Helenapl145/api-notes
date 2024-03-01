const path = require("path")


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'monorail.proxy.rlwy.net',
      port: '25230',
      database: 'railway',
      user: 'root',
      password: 'CChGa4F4dfA4ahH-BBeBeAGGAf14DhBb'
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