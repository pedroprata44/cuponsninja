import Logger from "./Logger"
import UserRepository from "./UserRepository"
import User from "./User"

export default class UserSignup{

    constructor(private userRepository: UserRepository, private logger: Logger){
    }

    async execute(input:Input):Promise<Output>{
        this.logger.log(`signup user ${input.name}`)
        const existingUser = await this.userRepository.getByEmail(input.email)
        if(existingUser) throw new Error("This email already exists")
        const user = User.create(input.name, input.cpf, input.email, input.phone)
        await this.userRepository.save(user)
        return{
            userId: user.id
        }
    }
}

type Input = {
    name: string,
    cpf: string,
    email: string,
    phone: string
}

type Output = {
    userId: string
}