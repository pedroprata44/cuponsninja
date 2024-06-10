import CouponRepository from "../../application/repository/CouponRepository";
import Coupon from "../../domain/Coupon";
import DatabaseConnection from "../database/DatabaseConnection";

export default class CouponRepositoryDatabase implements CouponRepository{

    constructor(readonly connection: DatabaseConnection){}

    async save(coupon: any): Promise<void> {
        await this.connection.query("insert into data.coupon (id, createdBy, describe, quantity, creationdate) values ($1, $2, $3, $4, $5)",[coupon.id, coupon.createdBy, coupon.describe, coupon.quantity, coupon.creationDate])
    }
    async update(quantity: number, couponId: string): Promise<void>{
        await this.connection.query("update data.coupon set quantity = $1 where id = $2", [quantity, couponId])
    }
    async getById(couponId: string): Promise<Coupon | undefined> {
        const [coupon] = await this.connection.query("select * from data.coupon where id = $1", [couponId])
        if(!coupon) return undefined
        return Coupon.restore(coupon.id, coupon.createdBy, coupon.describe, coupon.quantity)
    }
}