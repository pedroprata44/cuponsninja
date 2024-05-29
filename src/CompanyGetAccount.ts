import CompanyGetDAO from "./CompanyGetDAO"
export default class CompanyGetAccount{
    companyGetDAO: CompanyGetDAO
    constructor(companyGetDAO: CompanyGetDAO){
        this.companyGetDAO = companyGetDAO
    }
    async execute(id:string){
        const company = await this.companyGetDAO.getById(id)
        return company
    }
}