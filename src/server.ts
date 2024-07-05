import express from 'express'
import  cors from 'cors'
import bodyParser from "body-parser";
import {routes} from "./routes/routes";
const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(routes)

server.listen(3333,()=>{
    console.log("server iniciado!")
})