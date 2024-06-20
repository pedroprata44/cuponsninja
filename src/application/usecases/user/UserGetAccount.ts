import UserRepository from "../../repository/UserRepository"

export default class UserGetAccount{
    userRepository: UserRepository
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }
    async execute(id:string): Promise<Output>{
        const user = await this.userRepository.getById(id)
        if(!user) throw new Error("This user doesn't exists")
        return {
            userId: user.id,
            name: user.name.value,
            email: user.email.value,
            phone: user.phone.value
        }
    }
}
type Output = {
    userId: string,
    name: string,
    email: string,
    phone: string
}