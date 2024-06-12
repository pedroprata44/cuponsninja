import Coupon from "../../../domain/Coupon"
import Logger from "../../logger/Logger"
import CompanyRepository from "../../repository/CompanyRepository"
import CouponRepository from "../../repository/CouponRepository"

export default class CouponCreate{
    constructor(private logger: Logger, private couponRepository: CouponRepository, private companyRepository: CompanyRepository){
    }
    async execute(input: Input): Promise<Output>{
        this.logger.log(`${input.code} ${input.describe} ${input.quantity}`)
        if(this.isInvalidCreatedBy(input.createdBy)) throw new Error("Invalid createdBy") 
        const existingCompany = await this.companyRepository.getById(input.createdBy)
        if(!existingCompany) throw new Error("This company not exists")
        const existingCoupon = await this.couponRepository.getByCode(input.code)
        if(existingCoupon) throw new Error("This code coupon already exists")
        const coupon = Coupon.create(input.code, input.discount, input.expirationDate, input.createdBy, input.describe, input.quantity)
        await this.couponRepository.save(coupon)
        return{
            couponId: coupon.id
        }
    }
    isInvalidCreatedBy(createdBy: string){
        return !createdBy
    }
}
type Input = {
    code: string,
    discount: string,
    expirationDate: Date,
    createdBy: string,
    describe: string,
    quantity: number
}
type Output = {
    couponId: string
}