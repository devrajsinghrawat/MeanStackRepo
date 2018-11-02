
obj = {
    x: 'hello'
}

console.log(obj.x)

console.log(obj['x'])

let y = 'x';
console.log(obj[y])

// let arr = new Array();

let arr = [];

arr.push(function () {
    console.log('hello 1')
});
arr.push(function () {
    console.log('hello 2')
});
arr.push(function () {
    console.log('hello 3')
});

arr.forEach(element => {
    element();
});