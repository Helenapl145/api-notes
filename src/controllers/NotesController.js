const knex = require("../database/knex");


class NotesController{
    async create(request, response) {
        const {title, description, tags, links} = request.body
        const user_id = request.user.id;
       

        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

    
        const linksInsert = links.map(link => {
            return {
                note_id,
                link
            
            }
        });

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });


        await knex("tags").insert(tagsInsert);

        return response.json();
    }

    async show(request, response){
        const { id } = request.params;

    
        const note = await knex("notes").where({ user_id: id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
        const links = await knex("links").where({ note_id: id }).orderBy("updated_at");
        
        console.log(note);
        return response.json({
            id: note.id, 
            name: note.name, 
            description: note.description,
            tags,
            links,
        });
        
    }

    async delete(request, response){
        const  { id } = request.params

        await knex("notes").where({ id }).delete()

        return response.json()
    }

    async index(request, response){
        const { title, tags } = request.query;
        const user_id = request.user.id;
    
        let notesQuery = knex("notes").where({ user_id });
    
        if (title) {
            notesQuery = notesQuery.where("title", "like", `%${title}%`);
        }
    
        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());
    
            notesQuery = notesQuery.whereIn("id", function() {
                this.select("note_id").from("tags").whereIn("name", filterTags);
            });
        }
    
        const notes = await notesQuery.orderBy("title");
    
        const notesWithTags = await Promise.all(notes.map(async note => {
            const noteTags = await knex("tags").where({ note_id: note.id });
    
            return {
                ...note,
                tags: noteTags
            };
        }));
    
        return response.json(notesWithTags);
    }    
}

module.exports = NotesController