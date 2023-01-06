import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


let stopOrbit = document.getElementById('stopOrbit')
let startOrbit = document.getElementById('startOrbit')
let coupe = document.getElementById('coupe')
let porsche = document.getElementById('porsche')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( '#dfdfdf', 1 );
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()
controls.autoRotate = true
controls.enableDamping = true
controls.minDistance = 5

stopOrbit.addEventListener('click', () => {
	stopOrbit.classList.add('active')
	startOrbit.classList.remove('active')
	controls.autoRotate = false
})

startOrbit.addEventListener('click', () => {
	stopOrbit.classList.remove('active')
	startOrbit.classList.add('active')
	controls.autoRotate = true
})

const ambient = new THREE.AmbientLight('0xffffff', 20);
scene.add(ambient)
let light = new THREE.PointLight('0xc4c4c4', 20)
light.position.set(0, 300, 500)
scene.add(light)

const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );

let typeCar = '../img/Porsche/scene.gltf'
const loader = new GLTFLoader();
loader.load( typeCar, gltf => {
	scene.add(gltf.scene);
	console.log(scene);

	coupe.addEventListener('click', () => {
		if(typeCar == '../img/Car/scene.gltf') {
			alert('Это текущая машина')
		} else {
			scene.children.pop()
			scene.children[0].intensity = 2
			scene.children[1].intensity = 2
			typeCar = '../img/Car/scene.gltf'
			loader.load( '../img/Car/scene.gltf', gltf => {
				scene.children.push(gltf.scene);
			})
		}
	})

	porsche.addEventListener('click', () => {
		if(typeCar == '../img/Porsche/scene.gltf') {
			alert('Это текущая машина')
		} else {
			scene.children.pop()
			scene.children[0].intensity = 29
			scene.children[1].intensity = 20
			typeCar = '../img/Porsche/scene.gltf'
			loader.load( '../img/Porsche/scene.gltf', gltf => {
				scene.children.push(gltf.scene);
			})
		}
	})

}, error => {
	console.log('error', error);
});


function animate() {
	requestAnimationFrame(animate)
	controls.update()
	renderer.render(scene, camera)
}
animate()
