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
    static create(name: string, cpf: string, email: string, phone: string){
        const id = crypto.randomUUID()
        return new User(id, new Name(name), new Cpf(cpf), new Email(email), new Phone(phone))
    }
    static restore(id: string, name: string, cpf: string, email: string, phone: string){
        return new User(id, new Name(name), new Cpf(cpf), new Email(email), new Phone(phone))
    }
}