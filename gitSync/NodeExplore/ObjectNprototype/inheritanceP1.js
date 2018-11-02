/** Using util.inherit we can only inherit the prototype chain between child and paraent class
 * for a complete inheritance, when we also need to inherit attribute of paraent class 
 * should call super constructor by passing context of current object 
  */

let util = require('util');

function Person(f, l) {
    this.fname = f;
    this.lname = l;
}

let rang = new Person('rang', 'rawat');

Person.prototype.name = function () {
    return (this.fname + this.lname);
}

function Student(id) {
    Person.call(this, 'Dev', 'Raj');     // Calling Perent Constructor with current context 
    this.id = id;
}

util.inherits(Student, Person);

let taka = new Student('001');

let result = taka.name();

console.log(result);