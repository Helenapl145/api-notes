const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const user_id = request.user.id;
        const tags = await knex("tags")
            .select('id', 'name') // Seleciona as colunas id e name
            .where({ user_id })
            .groupBy('id', 'name'); // Agrupa pela coluna id e name

        return response.json(tags);
    }
};


module.exports =  TagsController;