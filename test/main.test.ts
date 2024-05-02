import axios from "axios"

test("Should test signup by API", async function(){
    const response = await axios.post("http://localhost:3000/signup")
    console.log(response.data)
})

test("Should do signup by API", async function(){
    const inputSignup = {
        name: "user user",
        email: `user${Math.random}@user`,
        cpf: "91015490069",
        phone:"(99) 9999-9999"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.id}`)
    const outputGetAccount = responseGetAccount.data

    expect(outputSignup.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
})



// import { signUp } from "../src/main";

// //signup user tests

// test("Should not do signup user with a email already exists", async function(){
//     const email = `user${Math.random()}@user`
//     await signUp({email: email, name: "user user", cpf: "91015490069", phone: "(99) 9999-9999"})
//     await expect(() => signUp({email:email})).rejects.toThrow(new Error("This email already exists"))
// })

// test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", async function(name:any){
//     await expect(() => signUp({email:"mate@mate", name:name})).rejects.toThrow(new Error("Invalid name"))
// })

// test.each([undefined, null, "", "m.m"])("Should not do signup user with a invalid email", async function(email:any){
//     await expect(() => signUp({email:email, name:"user user"})).rejects.toThrow(new Error("Invalid email"))
// })

// test.each([undefined, null, "", "111", "11111111111", "11111111111"])("Should not do signup user with a invalid cpf", async function(cpf:any){
//     await expect(() => signUp({email:"mate@mate", name: "user user", cpf:cpf})).rejects.toThrow(new Error("Invalid cpf"))
// })

// test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup user with a invalid phone", async function(phone:any){
//     await expect(() => signUp({email:"mate@mate", name: "user user", cpf: "91015490069", phone:phone})).rejects.toThrow(new Error("Invalid phone"))
// })

// //signup company tests

// test("Should not do sign up company with a email already exists", async function(){
//     const email = `company${Math.random()}@company`
//     await signUp({isCompany:true, email:email, name: "company company", cnpj: "83800838000197", phone: "(99) 9999-9999"})
//     await expect(() => signUp({isCompany:true, email:email})).rejects.toThrow(new Error("This email already exists"))
// })

// test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", async function(name:any){
//     await expect(() => signUp({ isCompany: true, email: "mate@mate", name: name })).rejects.toThrow(new Error("Invalid name"))
// })

// test.each([undefined, null, "", "mate.mate"])("Should not do signup company with a invalid email", async function(email:any){
//     await expect(() => signUp({isCompany:true, email:email, name:"company company"})).rejects.toThrow(new Error("Invalid email"))
// })

// test.each([undefined, null, "", "111", "11111111111111", "83800838000155"])("Should not do signup company with a invalid cnpj", async function(cnpj:any){
//     await expect(() => signUp({isCompany:true, email:"mate@mate", name:"company company", cnpj:cnpj})).rejects.toThrow("Invalid cnpj")
// })

// test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", async function(phone:any){
//     await expect(() => signUp({isCompany:true, email:"mate@mate", name: "company company", cnpj:"83800838000197", phone:phone})).rejects.toThrow(new Error("Invalid phone"))
// })