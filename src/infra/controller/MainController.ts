import UserGetAccount from "../../application/usecases/user/UserGetAccount"
import UserSignup from "../../application/usecases/user/UserSignup"
import HttpServer from "../http/HttpServer"


export default class MainController{
    constructor(readonly httpServer: HttpServer, userSignup: UserSignup, userGetAccount: UserGetAccount){
        httpServer.register("post", "/signup/user", async function(params: any, body: any){
            const output = await userSignup.execute(body)
            return output
        })

        httpServer.register("get", "/accounts/user/:id", async function(params:any, body: any) {
            const output = await userGetAccount.execute(params.id)
            return output
        })
    }
}