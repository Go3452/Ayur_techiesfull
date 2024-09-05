
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer( );
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000,0);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1,1000);
camera.position.set(6, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 25;
controls.minPolarAngle = -1;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 2, 0);
controls.update();

const spotLight = new THREE.SpotLight(0xffffff, 3000, 50, 0.22, 1);
spotLight.position.set(4, 25, 0);
spotLight.castShadow = false;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('public3/lavender/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;
  mesh.position.set(0, 2, 0);
  scene.add(mesh);

}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
