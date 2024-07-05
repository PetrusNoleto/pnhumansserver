import {requestHumanResults} from "../types/humanTypes";
import {databaseConnection} from "../models/connect";
import {requestTypes} from "../types/requestTypes";

export class HumansController {
    private userId:string
    private humanId:string
    private humanName:string
    private humanLastName:string
    private humanGender:string
    private humanAge:number
    private humanPhone:string
    private humanCell:string
    private humanEmail:string
    private humanLocationCountry:string
    private humanLocationState:string
    private humanLocationCity:string
    private humanLocationStreetName:string
    private humanLocationStreetNumber:string
    private humanLocationPostCode:number
    private humanLocationCoordinatesLatitude:string
    private humanLocationCoordinatesLongitude:string
    private humanIdentification:string
    private humanPicture:string
    private humanUserName:string
    private humanPassword:string

    constructor() {
        this.userId = ""
        this.humanId = ""
        this.humanName = ""
        this.humanLastName = ""
        this.humanGender = ""
        this.humanAge = 0
        this.humanPhone = ""
        this.humanCell = ""
        this.humanEmail = ""
        this.humanLocationCountry = ""
        this.humanLocationState = ""
        this.humanLocationCity = ""
        this.humanLocationStreetName = ""
        this.humanLocationStreetNumber = ""
        this.humanLocationPostCode = 0
        this.humanLocationCoordinatesLatitude = ""
        this.humanLocationCoordinatesLongitude = ""
        this.humanIdentification = ""
        this.humanPicture = ""
        this.humanUserName = ""
        this.humanPassword = ""
    }
    public async create({
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
                        }:requestTypes){
        console.log(requestUserId)
        this.userId = requestUserId
        this.humanName = requestName
        this.humanLastName = requestLastName
        this.humanGender = requestGender
        this.humanAge = requestAge
        this.humanPhone = requestPhone
        this.humanCell = requestCell
        this.humanEmail = requestEmail
        this.humanLocationCountry = requestCountry
        this.humanLocationState = requestState
        this.humanLocationCity = requestCity
        this.humanLocationStreetName = requestStreetName
        this.humanLocationStreetNumber = requestStreetNumber
        this.humanLocationPostCode = requestPostcode
        this.humanLocationCoordinatesLatitude = requestLatitude
        this.humanLocationCoordinatesLongitude = requestLongitude
        this.humanIdentification = requestIdentification
        this.humanPicture = requestPicture
        this.humanUserName = requestUserName
        this.humanPassword = requestPassword
        try{
            const createHuman = await databaseConnection.humans.create({
                data:{
                    name:this.humanName,
                    lastName:this.humanLastName,
                    gender:this.humanGender,
                    age:this.humanAge,
                    phone:this.humanPhone,
                    cell:this.humanCell,
                    email:this.humanEmail,
                    country:this.humanLocationCountry,
                    state:this.humanLocationState,
                    city:this.humanLocationCity,
                    streetName:this.humanLocationStreetName,
                    streetNumber:this.humanLocationStreetNumber,
                    postCode:this.humanLocationPostCode,
                    coordinatesLatitude: this.humanLocationCoordinatesLatitude,
                    coordinatesLongitude: this.humanLocationCoordinatesLongitude,
                    createdBy:this.userId,
                    picture:this.humanPicture,
                    username:this.humanUserName,
                    password:this.humanPassword,
                    identification:this.humanIdentification
                }
            })

            return "humano criado com sucesso"
        }catch (error){
            console.log(error)
            return "não foi possivel criar seu humano"
        }

    }
    public async listAll(userId:string){
        this.userId = userId
        try{
            const getHumans = await databaseConnection.humans.findMany({
                where:{
                    createdBy:this.userId
                }
            })
            return getHumans
        }
        catch (error){
            return "não foi possivel listar os humanos"
        }
    }
}