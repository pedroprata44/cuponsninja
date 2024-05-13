import axios from "axios"
axios.defaults.validateStatus = function (){
    return true
}

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