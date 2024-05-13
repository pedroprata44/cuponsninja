import AccountDAO from "./AccountDAO"

export async function getUserAccont(id:string){
    const userDAO = new AccountDAO()
    const user = await userDAO.getById(id)
    return user
}
