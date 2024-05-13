import axios from "axios"
axios.defaults.validateStatus = function (){
    return true
}
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