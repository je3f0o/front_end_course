window.addEventListener("DOMContentLoaded", function () { "use strict";
    
    let counter = 1;
    const walk = node => {
        console.log(`Node[${counter}] = ${node.nodeName}`);
        counter += 1;
        for (let i = 0; i < node.childNodes.length; ++i) {
            walk(node.childNodes[i]);
        }
    };

    walk(document);

});