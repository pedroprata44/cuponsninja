export default interface CompanyGetDAO{
    getById(companyId: string): Promise<any>
}