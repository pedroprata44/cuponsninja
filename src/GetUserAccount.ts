import UserDAO from "./UserDAO"

export default class GetUserAccount{
    userDAO: UserDAO
    constructor(){
        this.userDAO = new UserDAO()
    }
    async execute(id:string){
        const user = await this.userDAO.getById(id)
        return user
    }
}