export default interface UserGetDAO{
    getById(userId: string): Promise<any>
}