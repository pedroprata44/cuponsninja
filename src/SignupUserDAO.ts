export default interface SignupUserDAO{
    save(user: any): Promise<void>
    getByEmail(userEmail: string): Promise<any>
}