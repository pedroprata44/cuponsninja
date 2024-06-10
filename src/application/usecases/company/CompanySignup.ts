import Company from "../../../domain/Company"
import Logger from "../../logger/Logger"
import CompanyRepository from "../../repository/CompanyRepository"

export default class CompanySignup{
    constructor(private logger: Logger, private companyRepository: CompanyRepository){
    }
    async execute(input:Input): Promise<Output>{
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

type Input = {
    name: string,
    cnpj: string,
    email: string,
    phone: string
}
type Output = {
    companyId: string
}