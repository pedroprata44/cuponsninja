export default interface GetCompanyDAO{
    getById(companyId: string): Promise<any>
}