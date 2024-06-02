import pgPromise from "pg-promise";
import CouponDAO from "./CouponDAO";

export default class CouponDAODatabase implements CouponDAO{
    async save(coupon: any): Promise<void> {
        const connection = pgPromise()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("insert into data.coupon (id, createdBy, describe, quantity, creationdate) values ($1, $2, $3, $4, $5)",[coupon.id, coupon.createdBy, coupon.describe, coupon.quantity, coupon.creationDate])
        connection.$pool.end()
    }
    async update(couponId: string){
        const connection = pgPromise()("postgres://postgres:password@localhost:5432/cuponsninja")
        await connection.query("update data.coupon set quantity = quantity - 1 where id = $1", couponId)
        connection.$pool.end()
    }
    async getById(couponId: string): Promise<any> {
        const connection = pgPromise()("postgres://postgres:password@localhost:5432/cuponsninja")
        const [coupon] = await connection.query("select * from data.coupon where id = $1", [couponId])
        connection.$pool.end()
        return coupon
    }
}