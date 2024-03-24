import consumer from "../src/main";

test("Should return email", function(){
    const register = new consumer("pedro prata", "12345678901", "pedro@prata", "12345678")

    expect(register.getEmail()).toBe("pedro@prata")  
})