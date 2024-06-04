import pgp from "pg-promise"
import UserRepository from "./UserRepository"
import User from "./User"

export default class UserRepositoryDatabase implements UserRepository{
    async save(user: any){
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("insert into data.user_account (name, email, cpf, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [user.name, user.email, user.cpf, user.phone, user.id, user.dateSignup])
        connection.$pool.end()
    }
    async getById(userId: string): Promise<User | undefined>{
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [user] = await connection.query("select * from data.user_account where id = $1", [userId])
        connection.$pool.end()
        if(!user) return undefined
        return User.restore(user.id, user.name, user.cpf, user.email, user.phone)
    }
    async getByEmail(userEmail: string): Promise<User | undefined>{
        const connection = pgp()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [user] = await connection.query("select * from data.user_account where email = $1", [userEmail])
        connection.$pool.end()
        if(!user) return undefined
        return User.restore(user.id, user.name, user.cpf, user.email, user.phone)
    }
}