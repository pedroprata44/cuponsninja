import UserRepository from "./UserRepository"

export default class UserGetAccount{
    userRepository: UserRepository
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }
    async execute(id:string){
        const user = await this.userRepository.getById(id)
        if(!user) throw new Error("This user doesn't exists")
        return user
    }
}