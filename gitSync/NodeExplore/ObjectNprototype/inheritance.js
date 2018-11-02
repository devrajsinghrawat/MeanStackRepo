/** Object inheritance work in Node using Prototype chain*/
let eventEmitter = require('events');
let util = require('util');

function Person() {
    this.fname = "Dev";
    this.lname = "D"
}

util.inherits(Person, eventEmitter);

let person = new Person();

Person.prototype.name = function (data) {
    console.log("my name is " + this.fname + this.lname);
    person.emit('save', this.fname);
}

person.on('save', function (data) {
    console.log("Event Listner ", data);
})

person.name();
