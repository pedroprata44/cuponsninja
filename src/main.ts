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
}

function isInvalidName(name:string){return !name.match(/[a-zA-Z] [a-zA-Z]+/);}