import express, {Request, Response} from "express"
import GetUserAccount from "./GetUserAccount"
import GetCompanyAccount from "./GetCompanyAccount"
import SignupUser from "./SignupUser"
import SignupCompany from "./SignupCompany"
const app = express()
app.use(express.json())

app.post("/signup/user", async function (req: Request, res: Response){
    try{
        const input = req.body
        const signupUser = new SignupUser()
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
        const signupCompany = new SignupCompany()
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
    const getuseraccount = new GetUserAccount()
    const output = await getuseraccount.execute(input)
    res.json(output)
})

app.get("/accounts/company/:id", async function(req: Request, res: Response){
    const input = req.params.id
    const getcompanyaccount = new GetCompanyAccount()
    const output = await getcompanyaccount.execute(input)
    res.json(output)
})

app.listen(3000)