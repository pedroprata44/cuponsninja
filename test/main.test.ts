import { sum } from "../src/main";

test("Deve somar corretamente", function(){
    const result = sum(2,2);
    expect(result).toBe(4); 
});

test("Should return zero when params is negative", function(){
    const result = sum(-2,-2);
    expect(result).toBe(0); 
});