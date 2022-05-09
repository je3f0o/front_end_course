import scene      from "./scene.js";
import obj_loader from "./mesh.js";

const ratio  = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(90, ratio, 0.1, 1000);


const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
camera.add(pointLight);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.position.z = 5;

window.renderer = renderer;

obj_loader(function animate(ts) {
  
	renderer.render(scene, camera);
  requestAnimationFrame(animate);
});

window.camera = camera;