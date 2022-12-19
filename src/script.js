import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { Group, Mesh } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const particleTexture5 = textureLoader.load("/textures/particles/5.png");
const particleTexture8 = textureLoader.load("/textures/particles/8.png");
const particleTexture9 = textureLoader.load("/textures/particles/9.png");

/**
 * Particles
 */
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 40;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.color = new THREE.Color("white");
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture9;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
particles.position.y = 27;
scene.add(particles);

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);

walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
}

// Trees
const treeGeometry = new THREE.BoxGeometry(0.5, 2.5, 0.5);
const treeMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

const tree1 = new THREE.Mesh(treeGeometry, treeMaterial);
tree1.position.x = -10 + 3.5;
tree1.position.y = 2.5 / 2;
tree1.position.z = 10 - 3.5;

const tree2 = new THREE.Mesh(treeGeometry, treeMaterial);
tree2.scale.set(1, 1.75, 1);
tree2.position.x = 10 - 5.5;
tree2.position.y = 2.5 / 2;
tree2.position.z = -10 + 3.5;

scene.add(tree1, tree2);

// Park
const park = new THREE.Group();
scene.add(park);

// Columns
const columnLeft = new THREE.Mesh(treeGeometry, treeMaterial);
columnLeft.scale.set(-0.5, 1, -0.5);
columnLeft.position.x = 10 - 4.5;
columnLeft.position.y = 2.5 / 2;
columnLeft.position.z = 10 - 3.5;

const columnRight = new THREE.Mesh(treeGeometry, treeMaterial);
columnRight.scale.set(-0.5, 1, -0.5);
columnRight.position.x = 10 - 2;
columnRight.position.y = 2.5 / 2;
columnRight.position.z = 10 - 3.5;

const columnTop = new THREE.Mesh(treeGeometry, treeMaterial);
columnTop.scale.set(-0.4, 1, -0.4);
columnTop.position.x = 10 - 3.25;
columnTop.position.y = 2.5 - 0.25;
columnTop.position.z = 10 - 3.5;
columnTop.rotation.z = Math.PI * 0.5;

park.add(columnLeft, columnRight, columnTop);

// Swing
const swing = new THREE.Group();
scene.add(swing);

// swingColums

const swingColumnsMaterial = new THREE.MeshStandardMaterial({
  color: "#b2b6b1",
});

swingColumnsMaterial.metalness = 0.4;
swingColumnsMaterial.roughness = 0.7;

const swingColumnLeft = new THREE.Mesh(treeGeometry, swingColumnsMaterial);
swingColumnLeft.scale.set(-0.15, 0.6, -0.15);
swingColumnLeft.position.x = columnLeft.position.x + 1;
swingColumnLeft.position.y = 1.5;
swingColumnLeft.position.z = 10 - 3.5;

const swingColumnRight = new THREE.Mesh(treeGeometry, swingColumnsMaterial);
swingColumnRight.scale.set(-0.15, 0.6, -0.15);
swingColumnRight.position.x = columnRight.position.x - 1;
swingColumnRight.position.y = 1.5;
swingColumnRight.position.z = 10 - 3.5;

const swingBox = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.1, 0.25),
  new THREE.MeshStandardMaterial({ color: "#c3cc30" })
);

swingBox.position.x = 10 - 3.25;
swingBox.position.y = 0.75;
swingBox.position.z = 10 - 3.5;

swing.add(swingColumnLeft, swingColumnRight);
scene.add(swingBox);

// BushTree
const BushTree1 = new Mesh(bushGeometry, bushMaterial);
BushTree1.scale.set(0.75, 0.75, 0.75);
BushTree1.position.set(
  tree1.position.x,
  tree1.position.y * 2.25,
  tree1.position.z
);

const BushTree1n2 = new Mesh(bushGeometry, bushMaterial);
BushTree1n2.scale.set(0.5, 0.5, 0.5);
BushTree1n2.position.set(
  tree1.position.x + 0.5,
  tree1.position.y * 2.25,
  tree1.position.z
);

const BushTree2 = new Mesh(bushGeometry, bushMaterial);
BushTree2.scale.set(1, 1, 1);
BushTree2.position.set(
  tree2.position.x,
  tree2.position.y * 2.25,
  tree2.position.z
);

const BushTree2n2 = new Mesh(bushGeometry, bushMaterial);
BushTree2n2.scale.set(0.75, 0.75, 0.75);
BushTree2n2.position.set(
  tree2.position.x - 0.5,
  tree2.position.y * 2.25,
  tree2.position.z
);

scene.add(BushTree1, BushTree1n2, BushTree2, BushTree2n2);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.14);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.17);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

const behindHouseLight = new THREE.PointLight("#ff7d46", 1, 7);
behindHouseLight.position.set(0, 2.2, -2.7);
house.add(behindHouseLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#c3cc30", 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ff0000", 2, 3);
scene.add(ghost3);

const ghost4 = new THREE.PointLight("#ffffff", 2, 3);
ghost4.position.x = 10 - 3.25;
ghost4.position.y = 1;
ghost4.position.z = 10 - 3.5;
scene.add(ghost4);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
behindHouseLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

behindHouseLight.shadow.mapSize.width = 256;
behindHouseLight.shadow.mapSize.height = 256;
behindHouseLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Park
  const parkAngle = elapsedTime * 1.5;
  swingColumnLeft.rotation.x = Math.cos(parkAngle) * 0.09;
  swingColumnRight.rotation.x = Math.cos(parkAngle) * 0.09;

  swingBox.rotation.x = Math.cos(parkAngle) * 0.09;

  swingBox.position.z = 10 - 3.5 + Math.cos(parkAngle) * -0.09;

  // Update Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.3;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) * Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
