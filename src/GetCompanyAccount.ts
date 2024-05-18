import GetCompanyDAO from "./GetCompanyDAO"
export default class GetCompanyAccount{
    getCompanyDAO: GetCompanyDAO
    constructor(getCompanyDAO: GetCompanyDAO){
        this.getCompanyDAO = getCompanyDAO
    }
    async execute(id:string){
        const company = await this.getCompanyDAO.getById(id)
        return company
    }
}