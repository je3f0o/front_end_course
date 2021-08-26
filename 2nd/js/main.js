window.addEventListener("DOMContentLoaded", function () { "use strict";
    
    const btn = document.createElement("button");
    const $btn = new JeefoElement(btn);
    document.body.appendChild(btn);

    btn.appendChild(new Text("Click me!"));
    
    window.$btn = $btn;

});