import CompanyGetDAO from "./CompanyGetDAO";
import Logger from "./Logger";
import CouponCreateDAO from "./CouponCreateDAO";

export default class CouponCreate{
    constructor(private logger: Logger, private couponCreateDAO: CouponCreateDAO, private getCompanyDAO: CompanyGetDAO){
    }
    async execute(input:any){
        this.logger.log(input)
        if(await this.isInvalidCreatedBy(input.createdBy)) throw new Error("Invalid created by")
        if(this.isInvalidDescribe(input.describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(input.quantity)) throw new Error("Invalid quantity")
        input.id = crypto.randomUUID()
        input.creationDate = Date.call("")
        await this.couponCreateDAO.save(input)
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