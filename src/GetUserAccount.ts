import UserDAO from "./UserDAO"

export default class GetUserAccount{
    userDAO: UserDAO
    constructor(userDAO: UserDAO){
        this.userDAO = userDAO
    }
    async execute(id:string){
        const user = await this.userDAO.getById(id)
        return user
    }
}