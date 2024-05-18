export default interface GetUserDAO{
    getById(userId: string): Promise<any>
}