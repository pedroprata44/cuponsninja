export default class User{
    name: string
    cpf: string
    email: string
    phone: string

    constructor(name:string, cpf:string, email:string, phone:string){
        this.name = name
        this.cpf = cpf
        this.email = email
        this.phone = phone
        
        this.isValid()
    }

    isValid(){
        const validName:boolean = !(!this.name)
        const validCpf:boolean = !(!this.cpf || this.cpf.length !== 11)
        const validEmail:boolean = !(!this.email || !this.email.includes("@"))
        const validPhone:boolean = !(!this.phone || this.phone.length !== 8)

        if(!validName){throw new Error("Invalid name")}
        if(!validCpf){throw new Error("Invalid cpf")}
        if(!validEmail){throw new Error("Invalid email")}
        if(!validPhone){throw new Error("Invalid phone")}
    }
}