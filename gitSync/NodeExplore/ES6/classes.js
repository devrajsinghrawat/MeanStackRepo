/** Classes are just Java Scripts Function Objects
 * and just a syntextical sugar for function object and 
 * their prototypes.
*/

'use strict'

class Person {
    constructor(fname, lname) {
        this.fname = fname;
        this.lname = lname;
    }

    name() {
        return (this.fname + this.lname);
    }
}

let dev = new Person('Dev', 'D');

let lucky = new Person('Lucky', 'Rawat');

console.log(dev.__proto__);
console.log(lucky.__proto__)

class Student extends Person {
    constructor(id) {
        super('Vanya', 'Singh');
        this.id = id;
    }
}

let taka = new Student('0001');

console.log(taka.name());