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
        if(!this.isValidName(this.name)) throw new Error("Invalid name")
        if(!this.isValidEmail(this.email)) throw new Error("Invalid email")
        if(!this.isValidPhone(this.phone)) throw new Error("Invalid phone")
        if(!this.isValidCpf(this.cpf)) throw new Error("Invalid cpf")
    }
    isValidName(name:string){
        return !(!name)
    }
    isValidCpf(cpf:string){
        if(!cpf) return false
        cpf = this.cleanCpf(cpf)
        if(cpf.length !== 11) return false
        if(this.isSameDigits(this.cpf)) return false
        const digit1 = this.calculateDigit(this.cpf, 10)
        const digit2 = this.calculateDigit(this.cpf, 11)
        return this.extractCheckDigit(cpf) === `${digit1}${digit2}`
    }
    extractCheckDigit(cpf:string){
        return cpf.slice(9)
    }
    cleanCpf(cpf:string){
        return cpf.replace(/\D/g,"");
    }
    isSameDigits(cpf:string){
        return cpf.split("").every(c => c === cpf[0])
    }
    calculateDigit(cpf:string, factor: number){
        let total = 0
        for(const digit of cpf){
            if(factor > 1) total += parseInt(digit) * factor--
        }
        const rest = total%11
        return (rest < 2) ? 0 : 11 - rest
    }
    isValidEmail(email:string){
        return !(!email || !email.includes("@"))
    }
    isValidPhone(phone:string){
        return !(!phone || phone.length !== 8)
    }
}