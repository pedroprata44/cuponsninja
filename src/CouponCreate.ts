import CouponDAO from "./CouponDAO";
import CompanyGetDAO from "./CompanyGetDAO";
import Logger from "./Logger";

export default class CouponCreate{
    logger: Logger
    couponDAO: CouponDAO
    getCompanyDAO: CompanyGetDAO
    constructor(logger:Logger, couponDAO: CouponDAO, companyDAO: CompanyGetDAO){
        this.logger = logger
        this.couponDAO = couponDAO
        this.getCompanyDAO = companyDAO
    }
    async execute(input:any){
        this.logger.log(input)
        if(await this.isInvalidCreatedBy(input.createdBy)) throw new Error("Invalid created by")
        if(this.isInvalidDescribe(input.describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(input.quantity)) throw new Error("Invalid quantity")
        input.id = crypto.randomUUID()
        await this.couponDAO.save(input)
        return{
            couponId: input.id
        }
    }
    isInvalidQuantity(quantity: any){
        if(!quantity) return true
        return !(quantity >= 0)
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