import CompanyGetDAO from "./CompanyGetDAO"
import CompanySignupDAO from "./CompanySignupDAO"

export default interface CompanyDAO extends CompanySignupDAO, CompanyGetDAO{
    save(company: any): Promise<void>
    getById(companyId: string): Promise<any>
    getByEmail(companyEmail: string): Promise<any>
}