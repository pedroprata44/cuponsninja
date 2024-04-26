import { signUp, users } from "../src/main";

//signup user tests

test("Should not do signup user with a email already exists", function(){
    expect(() => signUp({email:"user@user"})).toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(name:any){
    expect(() => signUp({email:"mate@mate", name:name})).toThrow(new Error("Invalid name"))
})

test.each([undefined, null, "", "m.m"])("Should not do signup user with a invalid email", function(email:any){
    expect(() => signUp({email:email, name:"user user"})).toThrow(new Error("Invalid email"))
})

test.each([undefined, null, "", "111", "11111111111", "11111111111"])("Should not do signup user with a invalid cpf", function(cpf:any){
    expect(() => signUp({email:"mate@mate", name: "user user", cpf:cpf})).toThrow(new Error("Invalid cpf"))
})

test.each([undefined, null, "", "12345678"])("Should not do signup user with a invalid phone", function(phone:any){
    expect(() => signUp({email:"mate@mate", name: "user user", cpf: "91015490069", phone:phone})).toThrow(new Error("Invalid phone"))
})

test("Should return the correct user id", function(){
    expect(signUp({email:"mate@mate", name: "user user", cpf: "91015490069", phone: "123456789"})).toBe(users[users.length - 1].id)
})