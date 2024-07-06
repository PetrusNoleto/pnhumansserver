import express from 'express'
import  cors from 'cors'
import bodyParser from "body-parser";
import {routes} from "./routes/routes";
import {apiPort} from "./static/variables";
const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(routes)

server.listen(apiPort,()=>{
    console.log("server iniciado!")
})