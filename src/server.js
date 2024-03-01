require("dotenv/config")
require("express-async-errors")

const cors = require("cors")
const express = require("express")

const migrationRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

/* uma das formas de importar sem usar outro arquivo, porém vai precisar importar uma rota de cada vez
        const userRoutes = require('./routes/userRoutes.js')
*/


//dessa forma um arquivo fica responsável por chamar todas as rotas de uma vez
const routes = require("./routes")


migrationRun()

const app = express()
app.use(cors())
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
