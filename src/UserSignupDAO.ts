export default interface UserSignupDAO{
    save(user: any): Promise<void>
    getByEmail(userEmail: string): Promise<any>
}