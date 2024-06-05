import Logger from "./Logger"
import CompanyRepository from "./CompanyRepository"
import Company from "./Company"

export default class CompanySignup{
    constructor(private logger: Logger, private companyRepository: CompanyRepository){
    }
    async execute(input:any){
        this.logger.log(`signup company ${input.name}`)
        const Existingcompany = await this.companyRepository.getByEmail(input.email)
        if(Existingcompany) throw new Error("This email already exists")
        const company = Company.create(input.name, input.cnpj, input.email, input.phone)
        await this.companyRepository.save(company)
        return{
            companyId: company.id
        }
    }
}