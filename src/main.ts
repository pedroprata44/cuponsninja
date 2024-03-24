export default class consumer{
    constructor(readonly name:string, readonly cpf:string, readonly email:string, readonly phone:string){
    }

    getEmail(){
        return this.email
    }
}