

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './src/database/database.db'
    },
    useNullAsDefault: true // opcional, dependendo da sua configuração do SQLite
  });
  
  async function limparTabelas() {
    try {
      // Desativa as restrições de chave estrangeira
      await knex.raw('PRAGMA foreign_keys = OFF;');
  
      // Obtém o nome de todas as tabelas no banco de dados
      const tabelas = await knex.raw("SELECT name FROM sqlite_master WHERE type='table';");
  
      // Percorre todas as tabelas e apaga todos os dados
      for (const tabela of tabelas) {
        await knex(tabela.name).truncate(); // Este método é mais eficiente do que DELETE para limpar uma tabela inteira
      }
  
      console.log('Todos os dados foram apagados das tabelas.');
  
      // Reativa as restrições de chave estrangeira
      await knex.raw('PRAGMA foreign_keys = ON;');
    } catch (error) {
      console.error('Ocorreu um erro ao limpar as tabelas:', error);
    } finally {
      // Fecha a conexão com o banco de dados
      knex.destroy();
    }
  }
  
  // Chama a função para limpar as tabelas
  limparTabelas();
