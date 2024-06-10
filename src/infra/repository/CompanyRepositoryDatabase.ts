import Company from "../../domain/Company"
import CompanyRepository from "../../application/repository/CompanyRepository"
import DatabaseConnection from "../database/DatabaseConnection"
export default class CompanyRepositoryDatabase implements CompanyRepository{

    constructor(readonly connection: DatabaseConnection){
    }

    async save(company: any){
        await this.connection.query("insert into data.company_account (name, email, cnpj, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [company.name, company.email, company.cnpj, company.phone, company.id, company.dateSignup])
    }
    async getById(companyId: string): Promise<Company | undefined>{
        const [company] = await this.connection.query("select * from data.company_account where id = $1", [companyId])
        if(!company) return undefined
        return Company.restore(company.id, company.name, company.cnpj, company.email, company.phone)
    }
    async getByEmail(companyEmail: string): Promise<Company | undefined>{
        const [company] = await this.connection.query("select * from data.company_account where email = $1", [companyEmail])
        if(!company) return undefined
        return Company.restore(company.id, company.name, company.cnpj, company.email, company.phone)
    }
}