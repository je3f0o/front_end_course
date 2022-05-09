import scene       from "./scene.js";
import {OBJLoader} from "https://threejs.org/examples/jsm/loaders/OBJLoader.js";
import {MTLLoader} from "https://threejs.org/examples/jsm/loaders/MTLLoader.js";

const mtl_loader = new MTLLoader();

export default callback => {
  mtl_loader.load("/models/LadyCat/LadyCat.mtl", material => {
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(material);

    obj_loader.load("/models/LadyCat/LadyCat.obj", o => {
      //const s = 0.04;
      const s = 0.4;
      o.scale.multiply({x:s, y:s, z:s});
      o.position.y -= 3.5;

      scene.add(o);
      callback();
    });
  });
};