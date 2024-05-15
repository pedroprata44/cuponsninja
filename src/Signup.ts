import crypto from "crypto"
import AccountDAO from "./AccountDAO"
import { validateCpf } from "./CpfValidator"
import { validateCnpj } from "./CnpjValidator"

export default class SignUp{
    accountDAO: AccountDAO
    constructor(){
        this.accountDAO = new AccountDAO()
    }

    async execute(input:any){
        if(input.isCompany) return this.signUpCompany(input)
        if(!input.isCompany) return this.signUpUser(input)
    }

    async signUpUser(input:any){
        const user = await this.accountDAO.getByEmail(input.email)
        if(user) throw new Error("This email already exists")
        if(this.isInvalidName(input.name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(input.email)) throw new Error("Invalid email")
        if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
        if(this.isInvalidPhone(input.phone)) throw new Error("Invalid phone")
        input.userId = crypto.randomUUID()
        input.dateSignup = new Date()
        await this.accountDAO.save(input)
        return{
            userId: input.userId    
        }
    }

    async signUpCompany(input:any){
        const company = await this.accountDAO.getByEmail(input.email, true)
        if(company) throw new Error("This email already exists")
        if(this.isInvalidName(input.name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(input.email)) throw new Error("Invalid email")
        if(!validateCnpj(input.cnpj)) throw new Error("Invalid cnpj")
        if(this.isInvalidPhone(input.phone)) throw new Error("Invalid phone")
        input.companyId = crypto.randomUUID()
        input.dateSignup = new Date()
        await this.accountDAO.save(input, true)
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