exports.up = function(knex) {
  return knex.schema.createTable("notes", table =>{
    table.increments("id");

    table.string("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Correção aqui
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Correção aqui
  })
  .then(() => {
    // Altera a colação da coluna 'title' após criar a tabela
    return knex.schema.raw('ALTER TABLE notes MODIFY title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("notes");
};

