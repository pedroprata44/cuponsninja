import crypto from "crypto"
import express, {Request, Response} from "express"
import AccountDAO from "./AccountDAO"
const app = express()
app.use(express.json())

app.post("/signup",  async function (req: Request, res: Response){
    try{
        const input = req.body
        const output = await signUp(input)
        res.json(output)
    } catch(e:any){
        res.status(422).json({
            message: e.message
        })
    }
})

app.get("/accounts/user/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const output = await getUserAccont(input)
    res.json(output)
})

app.get("/accounts/company/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const output = await getCompanyAccount(input)
    res.json(output)
})

app.listen(3000)

async function signUp(input: any){
    if(input.isCompany) return signUpCompany(input)
    if(!input.isCompany) return signUpUser(input)
}

async function signUpUser(input:any){
    const userDAO = new AccountDAO()
    const user = await userDAO.getByEmail(input.email)
    if(user) throw new Error("This email already exists")
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCpf(input.cpf)) throw new Error("Invalid cpf")
    if(isInvalidPhone(input.phone)) throw new Error("Invalid phone")
    input.userId = crypto.randomUUID()
    input.dateSignup = new Date()
    await userDAO.save(input)
    return{
        userId: input.userId    
    }
}

async function signUpCompany(input:any){
    const accountDAO = new AccountDAO()
    const company = await accountDAO.getByEmail(input.email, true)
    if(company) throw new Error("This email already exists")
    if(isInvalidName(input.name)) throw new Error("Invalid name")
    if(isInvalidEmail(input.email)) throw new Error("Invalid email")
    if(!validateCnpj(input.cnpj)) throw new Error("Invalid cnpj")
    if(isInvalidPhone(input.phone)) throw new Error("Invalid phone")
    input.companyId = crypto.randomUUID()
    input.dateSignup = new Date()
    await accountDAO.save(input, true)
    return{
        companyId: input.companyId
    }
}

async function getCompanyAccount(id:string){
    const accountDAO = new AccountDAO()
    const company = await accountDAO.getById(id, true)
    return company
}

async function getUserAccont(id:string){
    const userDAO = new AccountDAO()
    const user = await userDAO.getById(id)
    return user
}

function validateCnpj(cnpj:string){
    if(!cnpj) return false
    cnpj = clean(cnpj)
    if(isInvalidLengthCnpj(cnpj)) return false
    if(allDigitsAreTheSame(cnpj)) return false
    const dg1 = calculateDigitCnpj(cnpj, 1)
    const dg2 = calculateDigitCnpj(cnpj, 2)

    return extractCheckDigit(false, cnpj) === `${dg1}${dg2}`
}

function calculateDigitCnpj(cnpj:string, number:number){
    if(number === 1){
        //calculate digit 1
        const elements = [5,4,3,2,9,8,7,6,5,4,3,2]
        let total = 0
        let index = 0
        for(const element of elements){
            if(index < elements.length){
                total += element * parseInt(cnpj[index])
                index++
            }
        }
        let rest = total % 11
        const digit = rest < 2? 0 : 11 - rest 
        return digit
    }
    if(number === 2){
        //calculate digit 2
        const elements = [6,5,4,3,2,9,8,7,6,5,4,3,2]
        let total = 0
        let index = 0
        for(const element of elements){
            if(index < elements.length){
                total += element * parseInt(cnpj[index])
                index++
            }
        }
        let rest = total % 11
        let digit = rest < 2? 0 : 11 - rest
        return digit
    }
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
    return !phone.match(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/)
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