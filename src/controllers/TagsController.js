const knex = require("../database/knex");

const TagsController = {
    async index(request, response) {
        const user_id = request.user.id;
        const tags = await knex("tags")
            .select('id', 'name') 
            .where({ user_id })
            .groupBy('id', 'name'); 

        return response.json(tags);
    }
};


module.exports = TagsController;