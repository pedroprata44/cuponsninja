export default interface SignupCompanyDAO{
    save(company: any): Promise<void>
    getByEmail(companyEmail: string): Promise<any>
}