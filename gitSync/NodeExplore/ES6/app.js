// Call and apply can Barrow the message from Object and use it according to its context 

obj = {
    name: 'DevD',
    greet: function (para1, para2) {
        console.log(`Hello ${this.name} and Value of Para is ${para1 + para2}`);     // Here this holds the context of Obj
    }
}

obj.greet(1, 2);

// The only difference is the way parameters being passed
obj.greet.call({ name: 'RajD' }, 3, 2);
obj.greet.apply({ name: 'RajD' }, [4, 2]);