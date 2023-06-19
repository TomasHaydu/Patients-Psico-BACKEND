import express from "express";
import dotenv from "dotenv"
import conectDB from "./config/db.js";
import userRouter from "./routes/usersRouter.js"
import patientsRouter from "./routes/patientsRouter.js"
import sessionRouter from "./routes/sessionRouter.js"
import cors from "cors"

const app = express()
app.use(express.json())

dotenv.config()

conectDB()

const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error ("Error de CROS"))
        }
    }
}

app.use(cors(corsOptions));

app.use("/api/users", userRouter)
app.use("/api/patients", patientsRouter)
app.use("/api/sessions", sessionRouter)

const PORT = process.env.port || 4000

app.listen(4000, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})