const { Router } = require("express");

const SessionsController = require("../controllers/SectionController");
const sessionsController = new SessionsController();

const sessionsRoutes = Router()
sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes;