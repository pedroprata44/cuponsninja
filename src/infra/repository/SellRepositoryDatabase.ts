import SellRepository from "../../application/repository/SellRepository"
import Sell from "../../domain/Sell"
import DatabaseConnection from "../database/DatabaseConnection"

export default class SellRepositoryDatabase implements SellRepository{
    constructor(readonly connection: DatabaseConnection){
    }
    async save(sell: any){
        await this.connection.query("insert into data.sell (id, coupon_id, user_id, date) values ($1, $2, $3, $4)", [sell.id, sell.couponId, sell.userId, sell.date])
    }
    async getById(sellId: string): Promise<Sell | undefined>{
        const [sell] = await this.connection.query("select * from data.sell where id = $1", [sellId])
        if(!sell) return undefined
        return Sell.restore(sell.id, sell.coupon_id, sell.user_id, sell.date)
    }
}