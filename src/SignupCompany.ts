import crypto from "crypto"
import { validateCnpj } from "./CnpjValidator"
import Logger from "./Logger"
import SignupCompanyDAO from "./SignupCompanyDAO"

export default class SignupCompany{
    signupCompanyDAO: SignupCompanyDAO
    logger: Logger
    constructor(logger: Logger, signupCompanyDAO: SignupCompanyDAO){
        this.signupCompanyDAO = signupCompanyDAO
        this.logger = logger
    }

    async execute(input:any){
        this.logger.log(`signup company ${input.name}`)
        const company = await this.signupCompanyDAO.getByEmail(input.email)
        if(company) throw new Error("This email already exists")
        if(this.isInvalidName(input.name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(input.email)) throw new Error("Invalid email")
        if(!validateCnpj(input.cnpj)) throw new Error("Invalid cnpj")
        if(this.isInvalidPhone(input.phone)) throw new Error("Invalid phone")
        input.companyId = crypto.randomUUID()
        input.dateSignup = new Date()
        await this.signupCompanyDAO.save(input)
        return{
            companyId: input.companyId
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