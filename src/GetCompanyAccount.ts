import CompanyDAO from "./CompanyDAO"
export default class GetCompanyAccount{
    companyDAO: CompanyDAO
    constructor(companyDAO: CompanyDAO){
        this.companyDAO = companyDAO
    }
    async execute(id:string){
        const company = await this.companyDAO.getById(id)
        return company
    }
}