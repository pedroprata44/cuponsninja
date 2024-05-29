export default interface CompanySignupDAO{
    save(company: any): Promise<void>
    getByEmail(companyEmail: string): Promise<any>
}