export default class Phone{
    constructor(readonly value: string){
    if(this.isInvalidPhone(value)) throw new Error("Invalid phone")
    }
    isInvalidPhone(phone:string){
        if(!phone) return true
        return !phone.match(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/)
    }
}