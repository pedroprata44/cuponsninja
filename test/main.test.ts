import axios from "axios"
axios.defaults.validateStatus = function (){
    return true
}

test("Do user signup by api", async function(){
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/user/${outputSignup.userId}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputGetAccount.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

test("Do company signup by api", async function(){
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/company/${outputSignup}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputGetAccount.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

//signup user tests

test("Should not do signup user with a email already exists", async function(){
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    await axios.post("http://localhost:3000/signup", inputSignup)
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSignup = responseSignup.data
    expect(responseSignup.status).toBe(422)
    expect(outputSignup.message).toBe("This email already exists")
})
test.each([undefined, null, "", "user"

])("Should not do signup user with a invalid name", async function(name:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: name
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid name")
})

test.each([undefined, null, "", "m.m"]
)("Should not do signup user with a invalid email", async function(email:any){
    const inputSignup = {
        email: email,
        name: "user user"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid email")    
})

test.each([undefined, null, "", "111", "11111111111", "11111111111", "46890347810"]
)("Should not do signup user with a invalid cpf", async function(cpf:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: cpf
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid cpf")  
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"]
)("Should not do signup user with a invalid phone", async function(phone:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: "91015490069",
        phone: phone
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid phone")
})

//signup company tests

test("Should not do sign up company with a email already exists", async function(){
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    await axios.post("http://localhost:3000/signup", inputSignup)
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("This email already exists")
})

test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", async function(name:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: name
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid name")
})

test.each([undefined, null, "", "mate.mate"])("Should not do signup company with a invalid email", async function(email:any){
    const inputSignup = {
        isCompany: true,
        email: email,
        name: "company company"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid email")
})

test.each([undefined, null, "", "111", "11111111111111", "83800838000155"])("Should not do signup company with a invalid cnpj", async function(cnpj:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: cnpj
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid cnpj")
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", async function(phone:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000197",
        phone: phone
    }
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    expect(responseSignup.status).toBe(422)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe("Invalid phone")
})