import AccountDAO from "./AccountDAO"
export default class GetCompanyAccount{
    accountDAO: AccountDAO
    constructor(){
        this.accountDAO = new AccountDAO()
    }
    async execute(id:string){
        const company = await this.accountDAO.getById(id, true)
        return company
    }
}