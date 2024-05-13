import pgp from "pg-promise"
export default class UserAccountDAO{
    async save(account: any, isCompany=false){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        if(isCompany){
            await connection.query("insert into data.company_account (name, email, cnpj, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [account.name, account.email, account.cnpj, account.phone, account.companyId, account.dateSignup])
            connection.$pool.end()
        }
        if(!isCompany){
            await connection.query("insert into data.user_account (name, email, cpf, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [account.name, account.email, account.cpf, account.phone, account.userId, account.dateSignup])
            connection.$pool.end()
        }
    }
    async getById(accountId: string, isCompany=false){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        if(isCompany){
            const [company] = await connection.query("select * from data.company_account where id = $1", [accountId])
            connection.$pool.end()
            return company
        }
        const [user] = await connection.query("select * from data.user_account where id = $1", [accountId])
        connection.$pool.end()
        return user
    }
    async getByEmail(accountEmail: string, isCompany=false){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        if(isCompany){
            const [company] = await connection.query("select * from data.company_account where email = $1", [accountEmail])
            connection.$pool.end()
            return company
        }
        const [user] = await connection.query("select * from data.user_account where email = $1", [accountEmail])
        connection.$pool.end()
        return user
    }
}