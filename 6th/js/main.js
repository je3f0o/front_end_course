window.addEventListener("DOMContentLoaded", function () { "use strict";

    const input  = document.querySelector("input");
    const canvas = document.querySelector("canvas");
    const worker = new Worker("js/worker.js");

    canvas.width = window.innerWidth - 100;
    const ctx = canvas.getContext("2d");

    // worker js message event
    worker.addEventListener("message", e => {
        const image_data = e.data;
        ctx.putImageData(image_data, 0, 0);
    });

    async function get_image_data (file) {
        const bitmap = await createImageBitmap(file);
        if (bitmap.width > bitmap.height) {
            canvas.height = canvas.width * (bitmap.height / bitmap.width);
        } else {
            canvas.height = canvas.width * (bitmap.width / bitmap.height);
        }
        //canvas.width  = img.width;
        //canvas.height = img.height;

        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
            
            

            // ctx.putImageData(image_data, 0, 0);


    input.addEventListener("change", async e => {
        const file = input.files[0];
        const image_data = await get_image_data(file);

        worker.postMessage(image_data, [image_data.data.buffer]);
    });

});