const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe('absolute', () => {
    it('should return positive when number is positive ', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })

    it('should return positive when number is negative ', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })

    it('should return zero when number is zero ', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
})

describe('greet', () => {
    it('should return greet message', () => {
        const result = lib.greet('DevD');
        // expect(result).toMatch(/DevD/);
        expect(result).toContain('DevD');
    })
})

describe('getCurrencies', () => {
    it('It should return supported currencies like USD', () => {
        const result = lib.getCurrencies();
        // Too General
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Correct way
        expect(result).toContain('USD');
        // expect(result).toContain('$USD');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
    })

})

describe('getProduct', () => {
    it('Should return the product with given ID', () => {
        result = lib.getProduct(1);

        // Whole object should match
        expect(result).toEqual({
            'id': 1,
            price: 10
        });

        // Any attribute should match
        expect(result).toMatchObject({
            'id': 1
        });

        // Any property should match
        expect(result).toHaveProperty('id', 1);
    })
})

describe('registerUser', () => {

    it('Should throw if user name is flasy', () => {
        const args = [null, NaN, undefined, '', 0, false];
        args.forEach(a => {
            expect(() => {
                lib.registerUser(a);
            }).toThrow()
        });
    })

    it('Should return registered User object', () => {
        result = lib.registerUser('devd');

        expect(result.id).toBeGreaterThan(0);
        expect(result).toMatchObject({
            'username': 'devd'
        });

        expect(result).toHaveProperty('username');

        expect(result.username).toHaveLength(4);
    })
})

describe('applyDiscount', () => {
    it('Apply 10% discount if customer point is more then 10', () => {
        const order = {
            customerId: 1,
            totalPrice: 10
        }

        db.getCustomerSync = function (customerId) {
            console.log('Fake db Call...');
            return {
                id: customerId,
                points: 11
            }
        }

        lib.applyDiscount(order);
        expect(order.totalPrice).toEqual(9);
    })
})

describe('notifyCustomer', () => {
    it('should send email to customer', () => {
        const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolvedValue(1);
        mockFunction.mockRejectedValue(new Error('....error message'));

        const result = await mockFunction(); // for Promise handling 

        db.getCustomerSync = function (customerId) {
            return {
                email: 'a'
            }
        }

        let mailsend = false;
        mail.send = function (email, message) {
            mailsend = true;
        }

        lib.notifyCustomer({
            customerId: 1
        });
        expect(mailsend).toBe(true);
    })
})