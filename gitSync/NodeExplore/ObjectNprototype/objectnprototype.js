let person = {
    fname: '',
    lname: '',
    name: function () {
        return this.fname + ' ' + this.lname;
    }
}

let john = Object.create(person);

john.fname = 'Dad';
john.lname = 'Singh';

let jane = Object.create(person);

jane.fname = 'Mom';
jane.lname = 'King';

john.name();
jane.name();