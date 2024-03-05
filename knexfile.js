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


const knexInstance = knex(knexConfig);

// Executa a consulta SQL para alterar a colação da coluna
knexInstance.raw('ALTER TABLE notes MODIFY title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;')
  .then(() => {
    console.log('Colação da coluna "title" alterada com sucesso.');
    knexInstance.destroy(); // Fecha a conexão com o banco de dados
  })
  .catch((error) => {
    console.error('Erro ao alterar a colação da coluna "title":', error);
    knexInstance.destroy(); // Fecha a conexão com o banco de dados
  });