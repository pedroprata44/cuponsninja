import CompanyDAO from "./CompanyDAO"
export default class GetCompanyAccount{
    companyDAO: CompanyDAO
    constructor(){
        this.companyDAO = new CompanyDAO()
    }
    async execute(id:string){
        const company = await this.companyDAO.getById(id)
        return company
    }
}