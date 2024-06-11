import CouponRepository from "../../application/repository/CouponRepository";
import Coupon from "../../domain/Coupon";
import DatabaseConnection from "../database/DatabaseConnection";

export default class CouponRepositoryDatabase implements CouponRepository{

    constructor(readonly connection: DatabaseConnection){}

    async save(coupon: any): Promise<void> {
        await this.connection.query("insert into data.coupon (id, code, discount, expiration_date, created_by, describe, quantity, creation_date) values ($1, $2, $3, $4, $5, $6, $7, $8)",[coupon.id, coupon.code, coupon.discount, coupon.expirationDate, coupon.createdBy, coupon.describe, coupon.quantity, coupon.creationDate])
    }
    async update(quantity: number, couponId: string): Promise<void>{
        await this.connection.query("update data.coupon set quantity = $1 where id = $2", [quantity, couponId])
    }
    async getById(couponId: string): Promise<Coupon | undefined> {
        const [coupon] = await this.connection.query("select * from data.coupon where id = $1", [couponId])
        if(!coupon) return undefined
        return Coupon.restore(coupon.id, coupon.code, coupon.discount, coupon.expiration_date, coupon.created_by, coupon.describe, coupon.quantity, coupon.creation_date)
    }
    async getByCode(couponCode: string): Promise<Coupon | undefined> {
        const [coupon] = await this.connection.query("select * from data.coupon where code = $1", [couponCode])
        if(!coupon) return undefined
        return Coupon.restore(coupon.id, coupon.code, coupon.discount, coupon.expiration_date, coupon.created_by, coupon.describe, coupon.quantity, coupon.creation_date)
    }
}