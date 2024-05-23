import UserGetDAO from "./UserGetDAO"

export default class UserGetAccount{
    userGetDAO: UserGetDAO
    constructor(userGetDAO: UserGetDAO){
        this.userGetDAO = userGetDAO
    }
    async execute(id:string){
        const user = await this.userGetDAO.getById(id)
        return user
    }
}