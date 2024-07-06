import {Router,Request,Response} from "express"
import jwt from 'jsonwebtoken';
import {HumansController} from "../../controllers/humanscontroller";
import {jwtSecretKey} from "../../static/variables";




export const humanRoutes = Router()
const human = new HumansController()
const secretKey = jwtSecretKey;
humanRoutes.post('/human/create/',async (req:Request,res:Response)=>{
    const {
            requestName,
            requestLastName,
            requestGender,
            requestAge,
            requestPhone,
            requestCell,
            requestEmail,
            requestCountry,
            requestState,
            requestCity,
            requestStreetName,
            requestStreetNumber,
            requestPostcode,
            requestLatitude,
            requestLongitude,
            requestIdentification,
            requestPicture,
            requestUserName,
            requestPassword
    } = req.body

    const token = req.headers.authorization as string
    function decodeJwt(token: string){
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    const decodedUser = decodeJwt(token);
    if (decodedUser) {

        const requestUserId = decodedUser as string
        const createHuman = await human.create({
            requestUserId,
            requestName,
            requestLastName,
            requestGender,
            requestAge,
            requestPhone,
            requestCell,
            requestEmail,
            requestCountry,
            requestState,
            requestCity,
            requestStreetName,
            requestStreetNumber,
            requestPostcode,
            requestLatitude,
            requestLongitude,
            requestIdentification,
            requestPicture,
            requestUserName,
            requestPassword
        })
        return res.json(createHuman)
    } else {
        return res.json('JWT inválido ou expirado.');
    }
})
humanRoutes.post('/humans/',async (req:Request,res:Response)=>{
    const token = req.headers.authorization
    if(token !== undefined){
        function decodeJwt(token: string){
            try {
                return jwt.verify(token, secretKey);
            } catch (error) {
                console.log(error)
                return null;
            }
        }
        const decodedUser = decodeJwt(token);
        const userToken = decodedUser as string
        console.log(userToken)
        if (decodedUser) {
            const getHumans = await human.listAll(userToken)
            return res.json(getHumans)
        }
    }else{
        return res.json("dados da requisição incorretas!")
    }
})