import GetUserDAO from "./GetUserDAO"
import SignupUserDAO from "./SignupUserDAO"

export default interface UserDAO extends SignupUserDAO, GetUserDAO{
    save(user: any): Promise<void>
    getById(userId: string): Promise<any>
    getByEmail(userEmail: string): Promise<any>
}