import AccountDAO from "./AccountDAO"

export async function getCompanyAccount(id:string){
    const accountDAO = new AccountDAO()
    const company = await accountDAO.getById(id, true)
    return company
}