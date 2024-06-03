import { validateCpf } from "./CpfValidator"

export default class User{
    id: string
    name: string
    cpf: string
    email: string
    phone: string
    dateSignup: string
    constructor(name: string, cpf: string, email: string, phone: string){
        if(this.isInvalidName(name)) throw new Error("Invalid name")
        if(this.isInvalidEmail(email)) throw new Error("Invalid email")
        if(!validateCpf(cpf)) throw new Error("Invalid cpf")
        if(this.isInvalidPhone(phone)) throw new Error("Invalid phone")
        this.id = crypto.randomUUID()
        this.name = name
        this.cpf = cpf
        this.email = email
        this.phone = phone
        this.dateSignup = Date.call("")
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