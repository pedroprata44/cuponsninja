import CouponConsumeDAO from "./CouponConsumeDAO";

export default class CouponConsume{
    constructor(private couponDAO: CouponConsumeDAO){    
    }
    async execute(couponId: string){
        await this.couponDAO.update(couponId)
    }
}