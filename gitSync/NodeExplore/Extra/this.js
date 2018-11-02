// /** Exploring This Scope */

// console.log(this);

// this.name = 'windowScope';

// console.log(this);

// function globelmemberfunction() {
//     console.log('this is globel member function');
//     console.log('this function is part of Globel object scope so this here should be Globel scope')
//     console.log(this);
// }

// globelmemberfunction();

// function Person() {
//     this.a = 'Object Scope';
//     this.b = this.name;          // This here is Object scope, so this.name will be undefined
//     this.c = function () {
//         console.log(this.a) //'This is Object Scope caz myMethod is a method and not a function which is attached to Object'
//     }
// }

// var ram = new Person();
// ram.c();

// console.log(ram);

/////////////////////////////////////
// Lecture: The this keyword


//console.log(this);
calculateAge(1985);
function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);
}
var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function () {
        console.log(this);
        console.log(2016 - this.yearOfBirth);

        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}
john.calculateAge();