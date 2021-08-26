

addEventListener("message", e => {
    const image_data = e.data;
    const w    = image_data.width;
    const h    = image_data.height;
    const data = image_data.data;

    for (let k = 0; k < 1000; ++k) {
        for (let x = 0; x < w; ++x) {
            for (let y = 0; y < h; ++y) {
                const index = (w * y + x) * 4;

                const r = data[index + 0] / 255;
                const g = data[index + 1] / 255;
                const b = data[index + 2] / 255;

                data[index + 0] = (r*r*(3-2*r)) * 255;
                data[index + 1] = (g*g*(3-2*g)) * 255;
                data[index + 2] = (b*b*(3-2*b)) * 255;
            }
        }
    }

    postMessage(image_data, [data.buffer]);
});