class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
    }

    on(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
    }

    removeListener(eventName, fn) {
        if (!this.listeners[eventName]) return;
        const index = this.listeners[eventName].findIndex((item) => item === fn);
        if (index === -1) return;
        this.listeners[eventName].splice(index, 1);
    }

    off(eventName, fn) { 
        if (!this.listeners[eventName]) return;
        const index = this.listeners[eventName].findIndex((item) => item === fn);
        if (index === -1) return;
        this.listeners[eventName].splice(index, 1);
    }

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const onceWrapper = (...args) => {
          fn(args);

          this.removeListener(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
    }

    emit(eventName, ...args) {
        if (!this.listeners[eventName]) return;
        this.listeners[eventName].forEach(fn => {
            fn(...args);
        });
    }

    listenerCount(eventName) {
        if (!this.listeners[eventName]) return;
        return this.listeners[eventName].length;
    }

    rawListeners(eventName) {
        if (!this.listeners[eventName]) return [];
        return [...this.listeners[eventName]];
    }
}

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

////////////////////////////////////////////////////////////////////////////////////////////////////////
class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const startTime = process.hrtime();
        const result = await asyncFunc(...args);
        this.emit('data', result);
        const endTime = process.hrtime(startTime);
        console.log(`time: ${endTime[0]} seconds and ${endTime[1]} nanoseconds`);
        this.emit('end');
    }
 }
 
 const fetchFromUrl = async (url, cb) => {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error();
    }
 } 
 
 const withTime = new WithTime();
 
 withTime.on('begin', () => console.log('About to execute'));
 withTime.on('end', () => console.log('Done with execute'));
 withTime.on('data', (data) => console.log('Data:', data));
 
 withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');
 
 console.log(withTime.rawListeners("end"));