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

        if(!validName){throw new Error("Name invalid")}
        else if(!validCpf){throw new Error("Cpf invalid")}
        else if(!validEmail){throw new Error("Email invalid")}
        else if(!validPhone){throw new Error("Phone invalid")}
    }
}