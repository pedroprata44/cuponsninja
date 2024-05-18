import express, {Request, Response} from "express"
import GetUserAccount from "./GetUserAccount"
import GetCompanyAccount from "./GetCompanyAccount"
import SignupUser from "./SignupUser"
import SignupCompany from "./SignupCompany"
import UserDAODatabase from "./UserDAODatabase"
import LoggerConsole from "./LoggerConsole"
import CompanyDAODatabase from "./CompanyDAODatabase"
const app = express()
app.use(express.json())

app.post("/signup/user", async function (req: Request, res: Response){
    try{
        const input = req.body
        const userDAO = new UserDAODatabase()
        const logger = new LoggerConsole()
        const signupUser = new SignupUser(userDAO, logger)
        const output = await signupUser.execute(input)
        res.json(output)
    } catch(e:any){
        res.status(422).json({
            message: e.message
        })
    }
})

app.post("/signup/company", async function (req: Request, res: Response){
    try{
        const input = req.body
        const logger = new LoggerConsole()
        const companyDAO = new CompanyDAODatabase()
        const signupCompany = new SignupCompany(logger, companyDAO)
        const output = await signupCompany.execute(input)
        res.json(output)
    } catch(e:any){
        res.status(422).json({
            message: e.message
        })
    }
})

app.get("/accounts/user/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const userDAO = new UserDAODatabase()
    const getuseraccount = new GetUserAccount(userDAO)
    const output = await getuseraccount.execute(input)
    res.json(output)
})

app.get("/accounts/company/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const companyDAO = new CompanyDAODatabase()
    const getcompanyaccount = new GetCompanyAccount(companyDAO)
    const output = await getcompanyaccount.execute(input)
    res.json(output)
})

app.listen(3000)