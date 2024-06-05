import CompanyRepository from "./CompanyRepository";
import CouponRepository from "./CouponRepository";

export default class CouponConsume{
    companyRepository: CompanyRepository
    constructor(private couponRepository: CouponRepository, companyRepository: CompanyRepository){    
        this.companyRepository = companyRepository
    }
    async execute(couponId: string){
        const coupon = await this.couponRepository.getById(couponId, this.companyRepository)
        if(!coupon) throw new Error("This coupon id not exists")
        if(!coupon.quantity) throw new Error("This coupon doesn't have enough quantity to be consumed")
        await this.couponRepository.update(couponId)
    }
}