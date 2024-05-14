import AccountDAO from "./AccountDAO"

export default class GetUserAccount{
    accountDAO: AccountDAO
    constructor(){
        this.accountDAO = new AccountDAO()
    }
    async execute(id:string){
        const user = await this.accountDAO.getById(id)
        return user
    }
}