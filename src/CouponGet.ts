import CompanyRepository from "./CompanyRepository";
import CouponRepository from "./CouponRepository";

export default class CouponGet{
    couponRepository: CouponRepository
    companyRepository: CompanyRepository
    constructor(couponRepository:CouponRepository, companyRepository: CompanyRepository){
        this.couponRepository = couponRepository
        this.companyRepository = companyRepository
    }
    async execute(couponId: string){
        const coupon = await this.couponRepository.getById(couponId, this.companyRepository)
        if(!coupon) throw new Error("This coupon doesn't exists") 
        return coupon
    }
}