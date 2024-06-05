import Logger from "./Logger";
import CouponRepository from "./CouponRepository";
import Coupon from "./Coupon";
import CompanyRepository from "./CompanyRepository";

export default class CouponCreate{
    constructor(private logger: Logger, private couponRepository: CouponRepository, private companyRepository: CompanyRepository){
    }
    async execute(input:any){
        this.logger.log(input)
        if(this.isInvalidCreatedBy(input.createdBy)) throw new Error("Invalid createdBy") 
        const existingCompany = await this.companyRepository.getById(input.createdBy)
        if(!existingCompany) throw new Error("This company not exists")
        const coupon = Coupon.create(input.createdBy, input.describe, input.quantity)
        await this.couponRepository.save(coupon)
        return{
            couponId: coupon.id
        }
    }
    isInvalidCreatedBy(createdBy: string){
        return !createdBy
    }
}