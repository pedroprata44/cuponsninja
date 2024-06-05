import { validateCnpj } from "./CnpjValidator"

export default class Company{
    id: string
    name: string
    cnpj: string
    email: string
    phone: string
    dateSignup: string
    constructor(id: string, name: string, cnpj: string, email: string, phone: string){
        if(this.isInvalidName(name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(email)) throw new Error("Invalid email")
        if(!validateCnpj(cnpj)) throw new Error("Invalid cnpj")
        if(this.isInvalidPhone(phone)) throw new Error("Invalid phone")
        this.id = id
        this.name = name
        this.cnpj = cnpj
        this.email = email
        this.phone = phone
        this.dateSignup = Date.call("")
    }
    static create(name: string, cnpj: string, email: string, phone: string){
        const id = crypto.randomUUID()
        return new Company(id, name, cnpj, email, phone)
    }
    static restore(id: string, name: string, cnpj: string, email: string, phone: string){
        return new Company(id, name, cnpj, email, phone)
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