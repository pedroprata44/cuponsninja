import express, {Request, Response} from "express"
import SignUp from "./Signup"
import GetUserAccount from "./GetUserAccount"
import GetCompanyAccount from "./GetCompanyAccount"
const app = express()
app.use(express.json())

app.post("/signup",  async function (req: Request, res: Response){
    try{
        const input = req.body
        const signup = new SignUp()
        const output = await signup.execute(input)
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