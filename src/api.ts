import express, {Request, Response} from "express"
import UserGetAccount from "./UserGetAccount"
import CompanyGetAccount from "./CompanyGetAccount"
import UserSignup from "./UserSignup"
import CompanySignup from "./CompanySignup"
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
        const userSignup = new UserSignup(userDAO, logger)
        const output = await userSignup.execute(input)
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
        const companySignup = new CompanySignup(logger, companyDAO)
        const output = await companySignup.execute(input)
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
    const userGetAccount = new UserGetAccount(userDAO)
    const output = await userGetAccount.execute(input)
    res.json(output)
})

app.get("/accounts/company/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const companyDAO = new CompanyDAODatabase()
    const companyGetAccount = new CompanyGetAccount(companyDAO)
    const output = await companyGetAccount.execute(input)
    res.json(output)
})

app.listen(3000)