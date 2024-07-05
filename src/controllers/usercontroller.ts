import {UserDatabase} from "../models/userDatabase";
import CryptoAES from 'crypto-js/aes';

interface  responseProps{
    code:number
    message:string
    user:string | null
}

export class User{
    private userid:string
    private username:string
    private userPassword:string
    constructor() {
        this.userid = ""
        this.username = ""
        this.userPassword = ""
    }
    public async create(requestUserName:string,requestPassword:string){
        this.username = requestUserName
        this.userPassword = requestPassword
        try{
            const databaseUser = new UserDatabase()
            const verify = await databaseUser.verifyExists(this.username)
            if(verify.message === "usuario não existe!"){
                const encryptedPassword = CryptoAES.encrypt(this.userPassword , '123');

                return await databaseUser.create(this.username,encryptedPassword.toString()) as responseProps
            }else{
                return verify as responseProps
            }
            }catch (error){
               return {code:500,message:"não foi possivel criar o usuario!",user:null} as responseProps
            }
    }
    public async auth(requestUserName:string,requestPassword:string){
        this.username = requestUserName
        this.userPassword = requestPassword
        try{
            const databaseUser = new UserDatabase()
            const verify = await databaseUser.verifyExists(this.username)
            if(verify.message === "usuario já existe!"){



                return await databaseUser.auth(this.username,this.userPassword) as responseProps



            }else{
                return verify as responseProps
            }
        }catch (error){
            return {code:500,message:"não foi possivel criar o usuario!",user:null} as responseProps
        }
    }
}