export default class Name{
    constructor(readonly value: string){
        if(this.isInvalidName(value)) throw new Error("Invalid name")
    }
    private isInvalidName(name:string){
        if(!name) return true
        return !name.match(/[a-zA-Z] [a-zA-Z]+/);
    }
}