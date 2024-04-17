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