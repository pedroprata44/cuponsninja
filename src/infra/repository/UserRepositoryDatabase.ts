import UserRepository from "../../application/repository/UserRepository"
import User from "../../domain/User"
import DatabaseConnection from "../database/DatabaseConnection"

export default class UserRepositoryDatabase implements UserRepository{

    constructor(readonly connection: DatabaseConnection){
    }

    async save(user: any){
        await this.connection.query("insert into data.user_account (name, email, cpf, phone, id, datesignup) values ($1, $2, $3, $4, $5, $6)", [user.name.value, user.email.value, user.cpf.value, user.phone.value, user.id, user.dateSignup])
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