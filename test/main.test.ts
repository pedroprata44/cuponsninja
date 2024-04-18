import { signUp } from "../src/main";

test("Should not do signup with a email already exists", function(){
    const inputSignup = {name:"user user", cpf:"12345678901", email:"user@user", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("This email already exists"))
})
test.each(["", "user"])("Should not do signup with a invalid name", function(name:string){
    const inputSignup = {name:name, cpf:"12345678901", email:"@", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid name"))
})
test.each(["","mate.mate"])("Should not do signup with a invalid email", function(email:string){
    const inputSignup = {name:"mate mate", cpf:"12345678901", email:email, phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid email"))
})
test.each(["", undefined, null, "12345678", "11111111111"])("Should not do signup with a invalid cpf", function(cpf:any){
    const inputSignup = {name: "mate mate", cpf:cpf, email: "mate@mate", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid cpf"))
})
test.each(["", undefined, null, "1111111111111"])("Should not do signup with a invalid cnpj", function(cnpj:any){
    const inputSignup = {name:"user user", cpf:"17274496069", email:"mate@mate", phone:"123456789", isCompany: true, cnpj:cnpj}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid cnpj"))
})