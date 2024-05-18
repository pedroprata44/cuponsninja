export default interface CompanyDAO{
    save(company: any): Promise<void>
    getById(companyId: string): Promise<any>
    getByEmail(companyEmail: string): Promise<any>
}