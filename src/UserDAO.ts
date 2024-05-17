export default interface UserDAO{
    save(user: any): Promise<void>
    getById(userId: string): Promise<any>
    getByEmail(userEmail: string): Promise<any>
}