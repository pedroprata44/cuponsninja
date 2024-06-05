import CompanyRepository from "./CompanyRepository"

export default class Coupon{
    id: string
    createdBy: string
    describe: string
    quantity: string
    creationDate: string
    companyRepository: CompanyRepository
    constructor(id: string, createdBy: string, describe: string, quantity: string, companyRepository: CompanyRepository){
        if(this.isInvalidCreatedBy(createdBy)) throw new Error("Invalid created by")
        if(this.isInvalidDescribe(describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(quantity)) throw new Error("Invalid quantity")
        this.id = id
        this.createdBy = createdBy
        this.describe = describe
        this.quantity = quantity
        this.creationDate = Date.call("")
        this.companyRepository = companyRepository
    }
    static create(createdBy: string, describe: string, quantity: string, companyRepository: CompanyRepository){
        const id = crypto.randomUUID()
        return new Coupon(id, createdBy, describe, quantity, companyRepository)
    }
    static restore(id: string, createdBy: string, describe: string, quantity: string, companyRepository: CompanyRepository){
        return new Coupon(id, createdBy, describe, quantity, companyRepository)
    }
    isInvalidQuantity(quantity: any){
        if(!quantity) return true
        return !(quantity >= 0)
    }
    isInvalidDescribe(describe: string){
        if(!describe) return true
        return !(describe.length <= 30)
    }
    isInvalidCreatedBy(createdBy: string){
        if(!createdBy) return true
        const company = this.companyRepository.getById(createdBy)
        if(!company) return true
    }
}