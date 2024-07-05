import {databaseConnection} from "./connect";


export class UserDatabase {
   private userId:string
   private userName:string
   private userPassword:string
    constructor() {
        this.userId = ""
        this.userName = ""
        this.userPassword = ""
   }
   public async verifyExists(username:string){
       this.userName = username
       try{
           const findUser = await  databaseConnection.user.findFirst({
               where:{
                   username:this.userName
               }
           })
           if(findUser){
               return {code:200,message:"usuario já existe!",user:findUser.id}
           }else{
               return  {code:404,message: "usuario não existe!",user:null}
           }
       }catch (error){
           console.log(error)
           return {code:500,message: "não foi possivel verificar o usuario!",user:null}
       }
   }
   public async create (username:string,userPassword:string){
       this.userName = username
       this.userPassword = userPassword
       try{
            const createUser = await  databaseConnection.user.create({
                data:{
                    username:this.userName,
                    password:this.userPassword
                }
            })
            return {code:203,message:"usuario criado com sucesso!",user:createUser.id}
        }catch (error){
            console.log(error)
            return {code:400,message:"não foi possivel criar o usuario!",user:null}
        }
    }
    public async auth (username:string,userPassword:string){
        this.userName = username
        this.userPassword = userPassword
        try{
            const getUser = await databaseConnection.user.findFirst({
                where:{
                    username:this.userName
                },
                select:{
                    id:true,
                    username:true,
                    password:true
                }
            })
            if(getUser){
                const verifyUsername = (this.userName === getUser.username)
                const verifyPassword = (this.userPassword === getUser.password)
                if(verifyUsername && verifyPassword){
                    return {code:200,message:"usuario authenticado!",user:getUser.id}
                }else{
                    return {code:400,message:"usuario não authenticado!",user:null}
                }
            }else{
                return {code:500,message:"não foi possivel authenticar!",user:null}
            }
        }catch (error){
            return {code:500,message:"não foi possivel authenticar!",user:null}
        }
    }
}