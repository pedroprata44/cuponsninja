import UserRepository from "./UserRepository"
import User from "./User"
import DatabaseConnection from "./DatabaseConnection"

export default class UserRepositoryDatabase implements UserRepository{

    constructor(readonly connection: DatabaseConnection){
    }

    async save(user: any){
        await this.connection.query("insert into data.user_account (name, email, cpf, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [user.name, user.email, user.cpf, user.phone, user.id, user.dateSignup])
    }
    async getById(userId: string): Promise<User | undefined>{
        const [user] = await this.connection.query("select * from data.user_account where id = $1", [userId])
        if(!user) return undefined
        return User.restore(user.id, user.name, user.cpf, user.email, user.phone)
    }
    async getByEmail(userEmail: string): Promise<User | undefined>{
        const [user] = await this.connection.query("select * from data.user_account where email = $1", [userEmail])
        if(!user) return undefined
        return User.restore(user.id, user.name, user.cpf, user.email, user.phone)
    }
}