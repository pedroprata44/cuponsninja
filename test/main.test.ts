import { signUp } from "../src/main";

test("Should not do signup with a email already exists", function(){
    const inputSignup = {name:"user", cpf:"12345678901", email:"user@user", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("This email already exists"))
})
test.each([""])("Should not do signup with a invalid name", function(name:string){
    const inputSignup = {name:name, cpf:"12345678901", email:"@", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid name"))
})