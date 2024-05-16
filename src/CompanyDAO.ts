import pgp from "pg-promise"
export default class CompanyDAO{
    async save(company: any){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("insert into data.company_account (name, email, cnpj, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [company.name, company.email, company.cnpj, company.phone, company.companyId, company.dateSignup])
        connection.$pool.end()
    }
    async getById(companyId: string){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [company] = await connection.query("select * from data.company_account where id = $1", [companyId])
        connection.$pool.end()
        return company
    }
    async getByEmail(companyEmail: string){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [company] = await connection.query("select * from data.company_account where email = $1", [companyEmail])
        connection.$pool.end()
        return company
    }
}