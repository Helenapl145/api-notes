
exports.up = knex => knex.schema.createTable("notes", table =>{
    table.increments("id");

    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
    .then(() => {
        // Altera a colação da coluna 'title' após criar a tabela
        return knex.schema.raw('ALTER TABLE notes MODIFY title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;');
      });
})


exports.down = knex => knex.dropTable("notes")
