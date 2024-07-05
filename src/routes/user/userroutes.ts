import {Router,Request,Response} from "express"
import jwt from 'jsonwebtoken';
import {User} from "../../controllers/usercontroller";

export const userRoutes = Router()
userRoutes.post('/user/create/',async (req:Request,res:Response)=>{
    const {requestUserName,requestUserPassword} = req.body
    if(requestUserName && requestUserName !== "" && requestUserPassword && requestUserPassword !== ""){
        const userController = new User()
        const create = await userController.create(requestUserName,requestUserPassword)
        // if(create.user !== null){
        //     const generateToken = jwt.sign(create.user, '123')
        //     return res.status(create.code).json(generateToken)
        // }
        return res.status(create.code).json(create.message)
    }else{
        res.status(400).json("dados da requisição incorretas")
    }
})

userRoutes.post('/user/auth/',async (req:Request,res:Response)=>{
    const {requestUserName,requestUserPassword} = req.body
    if(requestUserName && requestUserName !== "" && requestUserPassword && requestUserPassword !== ""){
        const userController = new User()
        const auth = await userController.auth(requestUserName,requestUserPassword)
        if(auth.user !== null){
            const generateToken = jwt.sign(auth.user, '123')
            return res.status(auth.code).json({code:auth.code,message:auth.message,token:generateToken})
        }
        return res.status(404).json('not authenticated')
    }else{
        res.status(400).json("dados da requisição incorretas")
    }
})