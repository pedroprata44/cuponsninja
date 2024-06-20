import Cpf from "./Cpf"
import Email from "./Email"
import Name from "./Name"
import Phone from "./Phone"

export default class User{
    id: string
    name: Name
    cpf: Cpf
    email: Email
    phone: Phone
    dateSignup: string
    constructor(id: string, name: Name, cpf: Cpf, email: Email, phone: Phone){
        this.id = id
        this.name = name
        this.cpf = cpf
        this.email = email
        this.phone = phone
        this.dateSignup = Date.call("")
    }
    static create(name: Name, cpf: Cpf, email: Email, phone: Phone){
        const id = crypto.randomUUID()
        return new User(id, name, cpf, email, phone)
    }
    static restore(id: string, name: Name, cpf: Cpf, email: Email, phone: Phone){
        return new User(id, name, cpf, email, phone)
    }
}