import crypto from "crypto"
import { validateCpf } from "./CpfValidator"
import Logger from "./Logger"
import UserSignupDAO from "./UserSignupDAO"

export default class UserSignup{
    userSignupDAO: UserSignupDAO
    logger: Logger
    constructor(userDAO: UserSignupDAO, logger: Logger){
        this.userSignupDAO = userDAO
        this.logger = logger
    }

    async execute(input:any){
        this.logger.log(`signup user ${input.name}`)
        const user = await this.userSignupDAO.getByEmail(input.email)
        if(user) throw new Error("This email already exists")
        if(this.isInvalidName(input.name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(input.email)) throw new Error("Invalid email")
        if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
        if(this.isInvalidPhone(input.phone)) throw new Error("Invalid phone")
        input.userId = crypto.randomUUID()
        input.dateSignup = new Date()
        await this.userSignupDAO.save(input)
        return{
            userId: input.userId    
        }
    }

    isInvalidName(name:string){
        if(!name) return true
        return !name.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    isInvalidEmail(email:string){
        if(!email) return true
        return !email.match(/^(.+)@(.+)$/);
    }

    isInvalidPhone(phone:string){
        if(!phone) return true
        return !phone.match(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/)
    }
}