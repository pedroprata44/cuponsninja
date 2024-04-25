import { signUp, signUpUser, users } from "../src/main";

//signup user

test("Should not do signUpUser with a user's email already exists", function(){
    const inputSignup = {name:"user user", cpf:"265.092.150-12", email:"user@user", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("This email already exists"))
})

test.each(["", "user"])("Should not do signUpUser with a invalid name", function(name:string){
    const inputSignup = {name:name, cpf:"265.092.150-12", email:"mate@mate", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid name"))
})

test.each(["","mate.mate"])("Should not do signUpUser with a invalid email", function(email:string){
    const inputSignup = {name:"mate mate", cpf:"265.092.150-12", email:email, phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid email"))
})

test.each(["", undefined, null, "12345678", "11111111111"])("Should not do signUpUser with a invalid cpf", function(cpf:any){
    const inputSignup = {name: "mate mate", cpf:cpf, email: "mate@mate", phone:"123456789"}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid cpf"))
})

test.each(["", undefined, null, "12345678", "1234567890"])("Should not do signUpUser with a invalid phone", function(phone:any){
    const inputSignup = {name:"mate mate", cpf:"265.092.150-12", email:"mate@mate", phone:phone}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid phone"))
})

test("Should return the last user id created", function(){
    const inputSignup = {name:"mate mate", cpf:"265.092.150-12", email:"test@test", phone: "123456789"}
    expect(signUpUser(inputSignup)).toBe(users[users.length - 1].id)
})

//signup company

test("Should not do signUpCompany with a company's email already exists", function(){
    const inputSignup = {name:"user user", cnpj: "65199380000180", email:"company@company", phone:"123456789", isCompany: true}
    expect(() => signUp(inputSignup)).toThrow(new Error("This email already exists"))
})

test.each(["", undefined, null, "1111111111111","11111111111111", "111"])("Should not do signup with a invalid cnpj", function(cnpj:any){
    const inputSignup = {name:"user user", cpf:"17274496069", email:"mate@mate", phone:"123456789", isCompany: true, cnpj:cnpj}
    expect(() => signUp(inputSignup)).toThrow(new Error("Invalid cnpj"))
})