import crypto from "crypto"

interface user{
    name:string
    cpf:string
    email:string
    phone:string
    id:string
}
export const users: user[] = []
users.push({name:"user", cpf:"12345678901", email:"user@user", phone:"123456789", id: crypto.randomUUID()})

interface company{
    name:string
    cnpj:string
    email:string
    phone:string
    id:string
}
const companys: company[] = []
companys.push({name:"company", cnpj: "65199380000180", email:"company@company", phone:"123456789", id: crypto.randomUUID()})

export function signUp(input: any){
    if(input.isCompany) return signUpCompany(input)
    if(!input.isCompany) return signUpUser(input)
}

export function signUpUser(input:any){
    for(const user of users){
        if(input.email === user.email) throw new Error("This email already exists")
    }
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
    if(isInvalidPhone(input.phone)) throw new Error("Invalid phone")
    const userId = crypto.randomUUID()
    users.push({name:input.name, cpf: input.cpf, email: input.email, phone: input.phone, id: userId})
    return userId
}

function signUpCompany(input:any){
    for(const company of companys){
        if(input.email == company.email) throw new Error("This email already exists")
    }
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCnpj(input.cnpj)) throw new Error("Invalid cnpj")
    const companyId = crypto.randomUUID()
    companys.push({name:input.name, cnpj: input.cnpj, email: input.email, phone: input.phone, id: companyId})
    return companyId
}

function validateCnpj(cnpj:string){
    if(!cnpj) return false
    cnpj = clean(cnpj)
    if(isInvalidLengthCnpj(cnpj)) return false
    if(allDigitsAreTheSame(cnpj)) return false
    const dg1 = calculateDigitCnpj(cnpj,1)
    const dg2 = calculateDigitCnpj(cnpj,2)
    return extractCheckDigit(false, cnpj) === `${dg1}${dg2}`
}

function calculateDigitCnpj(cnpj:string, factor:number){
    let digit
    if(factor === 1){
        const ordersFactor1 = [5,4,3,2,9,9,7,6,5,4,3,2]
        let index = 0
        let total = 0
        for(const order of ordersFactor1){
            if(index > 10) break 
            total += order * parseInt(cnpj[index])
            index++
        }
        const rest = total % (index + 1)
        if(rest < 2) digit = 0
        else digit = 11 - rest
    } else  if(factor === 2){
        const ordersFactor2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
        let index = 0
        let total = 0
        for(const order of ordersFactor2){
            if(index > 11) break
            total += order * parseInt(cnpj[index])
            index++
        }
        const rest = total % (index + 1)
        if(rest < 2) digit = 0
        else digit = 11 - rest
    }
    return digit
}

function isInvalidLengthCnpj(cnpj:string){
    return cnpj.length !== 14
}

function isInvalidName(name:string){
    if(!name) return true
    return !name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isInvalidEmail(email:string){
    if(!email) return true
    return !email.match(/^(.+)@(.+)$/);
}

function validateCpf(cpf:string){
    if(!cpf) return false
    cpf = clean(cpf)
    if(isInvalidLengthCpf(cpf)) return false
    if(allDigitsAreTheSame(cpf)) return false
    const dg1 = calculateDigitCpf(cpf, 10)
    const dg2 = calculateDigitCpf(cpf, 11)
    return extractCheckDigit(true, cpf) === `${dg1}${dg2}`
}

function isInvalidPhone(phone:string){
    if(!phone) return true
    return phone.length !== 9
}

function extractCheckDigit(isCpf: boolean, digits:string){
    if(isCpf) return digits.slice(9)
    return digits.slice(12)
}

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

function clean(digits:string){return digits.replace(/\D/g, "")}