

class EventEmitter {
    constructor () {
        this.events = {};
    }

    on(event_name, event_handler) {
        if (! this.events[event_name]) {
            this.events[event_name] = [];
        }
        this.events[event_name].push(event_handler);
    }

    emit(event_name, ...args) {
        if (this.events[event_name]) {
            for (const listener of this.events[event_name]) {
                listener.apply(this, args);
            }
        }
    }
}