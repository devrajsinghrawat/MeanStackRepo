
myname();

// Functions are definded during Decleration Phase so thats the reason myname() will work even 
// before defining it
function myname() {
    var fname = 'Dev';
    var lname = 'D';

    console.log(fname + lname)
}

// Variables or function Variables (also known function expression) are undefided in 
// Hoisting during Decleration Phase
console.log(name);
var name = 'DevD';

console.log(fullname());

var fullname = function () {
    var a = 1;
    console.log(a);
}