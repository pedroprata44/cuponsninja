import pgp from "pg-promise"
import Company from "./Company"
import CompanyRepository from "./CompanyRepository"
export default class CompanyRepositoryDatabase implements CompanyRepository{
    async save(company: any){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("insert into data.company_account (name, email, cnpj, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [company.name, company.email, company.cnpj, company.phone, company.id, company.dateSignup])
        connection.$pool.end()
    }
    async getById(companyId: string): Promise<Company | undefined>{
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [company] = await connection.query("select * from data.company_account where id = $1", [companyId])
        connection.$pool.end()
        if(!company) return undefined
        return Company.restore(company.id, company.name, company.cnpj, company.email, company.phone)
    }
    async getByEmail(companyEmail: string): Promise<Company | undefined>{
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [company] = await connection.query("select * from data.company_account where email = $1", [companyEmail])
        connection.$pool.end()
        if(!company) return undefined
        return Company.restore(company.id, company.name, company.cnpj, company.email, company.phone)
    }
}