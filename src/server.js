require("dotenv/config")
require("express-async-errors")

const cors = require("cors")
const express = require("express")

const migrationRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")


const routes = require("./routes")

const corsOptions = {
    origin: "http://localhost:5173", // Permitir apenas solicitações originadas de http://localhost:5173
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
    credentials: true, // Permitir envio de cookies
  }
  


migrationRun()

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
})





app.get('/users', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 
