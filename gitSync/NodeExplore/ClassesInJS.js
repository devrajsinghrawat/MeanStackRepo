var obj = { "nissan": "sentra", "color": "green" };

// Method # 1

function Person1(n, a, s) {
    this.name = n;
    this.age = a;
    this.salary = s;
    this.detailsSalary = function () {
        return (console.log("Salary: ", this.salary));
    }
}

// Adding methods in class using prototype
Person1.prototype.details = function () {
    return (console.log("Name: ", this.name, " Age: ", this.age));
}

let dev = new Person1("Dev1", 30, 22000);
let raj = new Person1("Raj1", 25, 20000);

dev.details();
raj.details();
dev.detailsSalary();
raj.detailsSalary();

// Method # 2
class Person2 {
    constructor(n, a, s) {
        this.name = n;
        this.age = a;
        this.salary = s;
    }

    detailsSalary() {
        return (console.log("Salary: ", this.salary));
    }
}

dev = new Person2("Dev2", 30, 22000);
raj = new Person2("Raj2", 25, 20000);

// Adding methods in class using prototype
Person2.prototype.details = function () {
    return (console.log("Name: ", this.name, " Age: ", this.age));
}

dev.details();
raj.details();
dev.detailsSalary();
raj.detailsSalary();

dev.address = "SRE";

let result = dev.hasOwnProperty('address');
result = raj.hasOwnProperty('address');

this.localStorage.setItem('data', JSON.stringify(obj));