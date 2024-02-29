//responsável por chamar todas as rotas

const {Router} = require("express")
const userRouter = require("./users.Routes.js")
const notesRouter = require("./notes.routes.js")
const tagsRoutes = require("./tags.Routes.js")
const sessionsRouter = require("./sessions.routes.js")

const routes = Router()

routes.use("/user", userRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRoutes)
routes.use("/sessions", sessionsRouter)

module.exports = routes



  