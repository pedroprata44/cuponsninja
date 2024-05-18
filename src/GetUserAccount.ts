import GetUserDAO from "./GetUserDAO"

export default class GetUserAccount{
    getUserDAO: GetUserDAO
    constructor(getUserDAO: GetUserDAO){
        this.getUserDAO = getUserDAO
    }
    async execute(id:string){
        const user = await this.getUserDAO.getById(id)
        return user
    }
}