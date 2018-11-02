events = require('events');
config = require('./config').events;

let save = new events();

save.on(config.SAVE, saved1);
save.on(config.SAVE, saved2);

function saved1() {
    console.log("Save listner 1 triggered")
}

function saved2() {
    console.log("Save listner 2 triggered")
}

save.emit(config.SAVE);