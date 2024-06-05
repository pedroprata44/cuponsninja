import CompanyRepository from "./CompanyRepository";
import Logger from "./Logger";
import CouponRepository from "./CouponRepository";
import Coupon from "./Coupon";

export default class CouponCreate{
    constructor(private logger: Logger, private couponRepository: CouponRepository, private companyRepository: CompanyRepository){
    }
    async execute(input:any){
        this.logger.log(input)
        const coupon = Coupon.create(input.createdBy, input.describe, input.quantity, this.companyRepository)
        await this.couponRepository.save(coupon)
        return{
            couponId: coupon.id
        }
    }
}