import GetCompanyDAO from "./GetCompanyDAO"
import SignupCompanyDAO from "./SignupCompanyDAO"

export default interface CompanyDAO extends SignupCompanyDAO, GetCompanyDAO{
    save(company: any): Promise<void>
    getById(companyId: string): Promise<any>
    getByEmail(companyEmail: string): Promise<any>
}