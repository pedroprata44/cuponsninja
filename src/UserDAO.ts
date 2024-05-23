import UserGetDAO from "./UserGetDAO"
import UserSignupDAO from "./UserSignupDAO"

export default interface UserDAO extends UserSignupDAO, UserGetDAO{
    save(user: any): Promise<void>
    getById(userId: string): Promise<any>
    getByEmail(userEmail: string): Promise<any>
}