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
    if(isInvalidCpf(input.cpf)) throw new Error("Invalid cpf")
}

function isInvalidName(name:string){return !name.match(/[a-zA-Z] [a-zA-Z]+/);}

function isInvalidEmail(email:string){return !email.match(/^(.+)@(.+)$/);}

function isInvalidCpf(cpf:string){
    if(!cpf) return false
    cpf = clean(cpf)
    if(isInvalidLength(cpf)) return false
    if(allDigitsAreTheSame(cpf)) return false
}

function allDigitsAreTheSame(cpf:string){return cpf.split("").every(c => c === cpf[0])}

function isInvalidLength(cpf: string){return cpf.length !== 11}

function clean(cpf:string){return cpf.replace(/\D/g, "")}