import pgp from "pg-promise"
export default class UserAccountDAO{
    async save(account: any){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("insert into data.user_account (name, email, cpf, phone, id, creationdate) values ($1, $2, $3, $4, $5, $6)", [account.name, account.email, account.cpf, account.phone, account.userId, account.dateSignup])
        connection.$pool.end()
    }
    async getById(accountId: string){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [user] = await connection.query("select * from data.user_account where id = $1", [accountId])
        connection.$pool.end()
        return user
    }
    async getByEmail(accountEmail: string){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [user] = await connection.query("select * from data.user_account where email = $1", [accountEmail])
        connection.$pool.end()
        return user
    }
}