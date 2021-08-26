
"use strict";


setTimeout(() => {
    console.log("First callback");
});

let timeout_id = setTimeout(() => {
    // send request to the server.
    console.log("Second callback");
});

setTimeout(() => {
    console.log("Third callback");
});

// sync codes
console.log("All callbacks registered in Event loop.");

clearTimeout(timeout_id);





