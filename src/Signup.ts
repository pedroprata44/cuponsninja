import crypto from "crypto"
import AccountDAO from "./AccountDAO"
import { validateCpf } from "./CpfValidator"
import { validateCnpj } from "./CnpjValidator"

export async function signUp(input: any){
    if(input.isCompany) return signUpCompany(input)
    if(!input.isCompany) return signUpUser(input)
}

export async function signUpUser(input:any){
    const userDAO = new AccountDAO()
    const user = await userDAO.getByEmail(input.email)
    if(user) throw new Error("This email already exists")
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
    if(isInvalidPhone(input.phone)) throw new Error("Invalid phone")
    input.userId = crypto.randomUUID()
    input.dateSignup = new Date()
    await userDAO.save(input)
    return{
        userId: input.userId    
    }
}

export async function signUpCompany(input:any){
    const accountDAO = new AccountDAO()
    const company = await accountDAO.getByEmail(input.email, true)
    if(company) throw new Error("This email already exists")
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCnpj(input.cnpj)) throw new Error("Invalid cnpj")
    if(isInvalidPhone(input.phone)) throw new Error("Invalid phone")
    input.companyId = crypto.randomUUID()
    input.dateSignup = new Date()
    await accountDAO.save(input, true)
    return{
        companyId: input.companyId
    }
}

function isInvalidName(name:string){
    if(!name) return true
    return !name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isInvalidEmail(email:string){
    if(!email) return true
    return !email.match(/^(.+)@(.+)$/);
}

function isInvalidPhone(phone:string){
    if(!phone) return true
    return !phone.match(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/)
}