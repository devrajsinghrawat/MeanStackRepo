eventClass = require('./EventModule');


let save = new eventClass();

save.on('onSave', saved1);
save.on('onSave', saved2);

function saved1() {
    console.log("Save listner 1 triggered")
}

function saved2() {
    console.log("Save listner 2 triggered")
}

save.emit('onSave');