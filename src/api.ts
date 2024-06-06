import express, {Request, Response} from "express"
import UserSignup from "./UserSignup"
import UserGetAccount from "./UserGetAccount"
import UserRepositoryDatabase from "./UserRepositoryDatabase"
import CompanySignup from "./CompanySignup"
import CompanyGetAccount from "./CompanyGetAccount"
import CompanyRepositoryDatabase from "./CompanyRepositoryDatabase"
import LoggerConsole from "./LoggerConsole"
import CouponCreate from "./CouponCreate"
import CouponGet from "./CouponGet"
import CouponRepositoryDatabase from "./CouponRepositoryDatabase"
import CouponConsume from "./CouponConsume"
const app = express()
app.use(express.json())

app.post("/signup/user", async function (req: Request, res: Response){
    try{
        const input = req.body
        const userRepository = new UserRepositoryDatabase()
        const logger = new LoggerConsole()
        const userSignup = new UserSignup(userRepository, logger)
        const output = await userSignup.execute(input)
        res.json(output)
        } catch(e:any){
            res.status(422).json({
            message: e.message
            })
            }
})

app.get("/accounts/user/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const userRepository = new UserRepositoryDatabase()
    const userGetAccount = new UserGetAccount(userRepository)
    const output = await userGetAccount.execute(input)
    res.json(output)
})

app.post("/signup/company", async function (req: Request, res: Response){
    try{
        const input = req.body
        const logger = new LoggerConsole()
        const companyRepository = new CompanyRepositoryDatabase()
        const companySignup = new CompanySignup(logger, companyRepository)
        const output = await companySignup.execute(input)
        res.json(output)
    } catch(e:any){
        res.status(422).json({
            message: e.message
        })
    }
})

app.get("/accounts/company/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const companyRepository = new CompanyRepositoryDatabase()
    const companyGetAccount = new CompanyGetAccount(companyRepository)
    const output = await companyGetAccount.execute(input)
    res.json(output)
})

app.post("/couponcreate", async function(req: Request, res: Response){
    try{
        const input = req.body
        const logger = new LoggerConsole()
        const couponRepository = new CouponRepositoryDatabase()
        const companyRepository = new CompanyRepositoryDatabase()
        const couponCreate = new CouponCreate(logger, couponRepository, companyRepository)
        const output = await couponCreate.execute(input)
        res.json(output)
    } catch(e: any){
        res.status(422).json({
            message: e.message
        })
    }
})

app.get("/couponget/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const couponRepository = new CouponRepositoryDatabase()
    const couponGet = new CouponGet(couponRepository)
    const output = await couponGet.execute(input)
    res.json(output)
})

app.post("/couponconsume/:id", async function (req: Request, res: Response){
    const id = req.params.id
    const couponConsume = new CouponConsume(new CouponRepositoryDatabase())
    const output = await couponConsume.execute(id)
    res.json(output)
})

app.listen(3000)