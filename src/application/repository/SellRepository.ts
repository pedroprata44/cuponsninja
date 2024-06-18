export default interface SellRepository {
    save(sell: any): Promise<void>
    getById(sellId: string): Promise<any>
}