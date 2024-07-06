import {Router,Request,Response} from "express"
import jwt from 'jsonwebtoken';
import {User} from "../../controllers/usercontroller";
import {jwtSecretKey} from "../../static/variables";

export const userRoutes = Router()

const jwtKey = jwtSecretKey;

userRoutes.post('/user/create/',async (req:Request,res:Response)=>{
    const {requestUserName,requestUserPassword} = req.body
    if(requestUserName && requestUserName !== "" && requestUserPassword && requestUserPassword !== ""){
        const userController = new User()
        const create = await userController.create(requestUserName,requestUserPassword)
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
            const generateToken = jwt.sign(auth.user, jwtKey)
            return res.status(auth.code).json({code:auth.code,message:auth.message,token:generateToken})
        }
        return res.status(404).json('not authenticated')
    }else{
        res.status(400).json("dados da requisição incorretas")
    }
})

userRoutes.post('/user/auth/token/',async (req:Request,res:Response)=>{
    const {authorization} = req.headers

    const token = authorization as string;
    function decodeJwt(token: string): { userId: string} | null {
        try {
            return (jwt.verify(token, jwtKey) as { userId: string });
        } catch (error) {
            console.error(error)
            return null;
        }
    }
    const decodedUser = decodeJwt(token);
    if (decodedUser) {
        return res.json(decodedUser)
    } else {
        return res.json('JWT inválido ou expirado.');
    }
})



