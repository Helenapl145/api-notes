const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

const knex = require("../database/knex");

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        // Verifica se o e-mail já está em uso
        const checkUserExists = await knex('users').where({ email }).first();

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso.");
        }

        // Hash da senha
        const hashedPassword = await hash(password, 8);

        // Insere o usuário no banco de dados
        await knex('users').insert({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        // Busca o usuário pelo ID
        const user = await knex('users').where({ id: user_id }).first();

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        // Verifica se o novo e-mail já está em uso
        const userWithUpdateEmail = await knex('users').where({ email }).first();

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso");
        }

        // Atualiza os dados do usuário
        const updatedUser = {
            name: name ?? user.name,
            email: email ?? user.email,
            updated_at: knex.fn.now() // Atualiza o timestamp
        };

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para mudar a senha");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere");
            }

            updatedUser.password = await hash(password, 8);
        }

        // Atualiza o usuário no banco de dados
        await knex('users').where({ id: user_id }).update(updatedUser);

        return response.json();
    }
}

module.exports = UsersController;
