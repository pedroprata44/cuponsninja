import CompanyRepository from "../../repository/CompanyRepository"
export default class CompanyGetAccount{
    companyRepository: CompanyRepository
    constructor(companyRepository: CompanyRepository){
        this.companyRepository = companyRepository
    }
    async execute(id:string){
        const company = await this.companyRepository.getById(id)
        return company
    }
}