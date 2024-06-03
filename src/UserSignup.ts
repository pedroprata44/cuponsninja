import crypto from "crypto"
import { validateCpf } from "./CpfValidator"
import Logger from "./Logger"
import UserSignupDAO from "./UserSignupDAO"
import User from "./User"

export default class UserSignup{

    constructor(private userSignupDAO: UserSignupDAO, private logger: Logger){
    }

    async execute(input:any){
        this.logger.log(`signup user ${input.name}`)
        const existingUser = await this.userSignupDAO.getByEmail(input.email)
        if(existingUser) throw new Error("This email already exists")
        const user = new User(input.name, input.cpf, input.email, input.phone)
        await this.userSignupDAO.save(user)
        return{
            userId: user.id
        }
    }
}