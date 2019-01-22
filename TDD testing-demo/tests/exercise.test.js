const exer = require("../exercise1");

describe('fizzBuzz', () => {
    it('Number divisible by 3 and 5', () => {
        const result = exer.fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    })

    it('Number divisible by 3', () => {
        const result = exer.fizzBuzz(9);
        expect(result).toBe('Fizz')
    })

    it('Number divisible by 5', () => {
        const result = exer.fizzBuzz(10);
        expect(result).toBe('Buzz')
    })

    it('Number not divisible either by 3 or 5', () => {
        const result = exer.fizzBuzz(11);
        expect(result).toBe(11)
    })

    it('Invalid Number or not a number', () => {
        expect(() => {
            exer.fizzBuzz('10')
        }).toThrow();
    })
})