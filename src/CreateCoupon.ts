import CouponDAO from "./CouponDAO";
import GetCompanyDAO from "./GetCompanyDAO";
import Logger from "./Logger";

export default class CreateCoupon{
    logger: Logger
    couponDAO: CouponDAO
    getCompanyDAO: GetCompanyDAO
    constructor(logger:Logger, couponDAO: CouponDAO, companyDAO: GetCompanyDAO){
        this.logger = logger
        this.couponDAO = couponDAO
        this.getCompanyDAO = companyDAO
    }
    async execute(input:any){
        this.logger.log(input)
        if(await this.isInvalidCreatedBy(input.createdBy)) throw new Error("Invalid created by")
        if(this.isInvalidDescribe(input.describe)) throw new Error("Invalid describe")
        input.id = crypto.randomUUID()
        await this.couponDAO.save(input)
        return{
            couponId: input.id
        }
    }
    isInvalidDescribe(describe: string){
        if(!describe) return true
        return !(describe.length <= 30)
    }
    async isInvalidCreatedBy(createdBy: string){
        if(!createdBy) return true
        const company = await this.getCompanyDAO.getById(createdBy)
        if(!company) return true
    }
}