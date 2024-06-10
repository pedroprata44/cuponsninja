import User from "../../domain/User"

export default interface UserRepository{
    save(user: User): Promise<void>
    getById(userId: string): Promise<User | undefined>
    getByEmail(userEmail: string): Promise<User | undefined>
}