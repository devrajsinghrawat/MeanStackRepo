// Event Emitter 

class Event {
    constructor() {
        this.events = {}
    }
};

Event.prototype.on = function (type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}

/** Scope issue this.event is undefined */
// Event.prototype.on1 = (type, listener) => {
//     this.events[type] = this.events[type] || [];
//     this.events[type].push(listener);
// }

Event.prototype.emit = function (type) {
    if (this.events[type]) {
        this.events[type].forEach((listener) => {
            listener();
        });
    }
}

module.exports = Event;