import express, {Request, Response} from "express"
import { signUp} from "./Signup"
import { getUserAccont } from "./GetUserAccount"
import { getCompanyAccount } from "./GetCompanyAccount"
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