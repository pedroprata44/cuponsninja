import crypto from "crypto"

interface user{
    name:string
    cpf:string
    email:string
    phone:string
}

const users: user[] = []
users.push({name:"user", cpf:"12345678901", email:"user@user", phone:"123456789"})

export function signUp(input: any){
    const userId = crypto.randomUUID()
    for(const user of users){
        if(input.email === user.email) throw new Error("This email already exists")
    }
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
    if(input.isCompany && !validadeCnpj(input.cnpj)) throw new Error("Invalid cnpj")
}

function validadeCnpj(cnpj:string){
    if(!cnpj) return false
    if(isInvalidLengthCnpj(cnpj)) return false
    if(allDigitsAreTheSame(cnpj)) return false
}

function calculateDigitCnpj(cnpj:string){
    return 0
}

function isInvalidLengthCnpj(cnpj:string){
    return cnpj.length !== 14
}

function isInvalidName(name:string){return !name.match(/[a-zA-Z] [a-zA-Z]+/);}

function isInvalidEmail(email:string){return !email.match(/^(.+)@(.+)$/);}

function validateCpf(cpf:string){
    if(!cpf) return false
    cpf = clean(cpf)
    if(isInvalidLengthCpf(cpf)) return false
    if(allDigitsAreTheSame(cpf)) return false
    const dg1 = calculateDigitCpf(cpf, 10)
    const dg2 = calculateDigitCpf(cpf, 11)
    return extractCheckDigit(cpf) === `${dg1}${dg2}`
}

function extractCheckDigit(cpf: string){return cpf.slice(9)}

function calculateDigitCpf(cpf:string, factor:number){
    let total = 0
    for(const digit of cpf){
        if(factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total%11
    return (rest < 2) ? 0 : 11 - rest
}

function allDigitsAreTheSame(digits:string){return digits.split("").every(c => c === digits[0])}

function isInvalidLengthCpf(cpf: string){return cpf.length !== 11}

function clean(cpf:string){return cpf.replace(/\D/g, "")}