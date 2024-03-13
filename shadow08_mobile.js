import * as THREE from 'three';

// Canvas inside a DIV from the page
const container = document.getElementById('canvasWrapper');

let camera, scene, renderer;

const meshes = [];

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(16.9, container.clientWidth / container.clientHeight);
    camera.position.set(0, 0, 9);
    scene = new THREE.Scene();
    /* window.addEventListener('resize', onWindowResize); */

    const geometry4 = new THREE.CylinderGeometry(1, 1, 0.02, 64);
    const material4 = new THREE.MeshMatcapMaterial({ color: 0xffff00 });
    const material5 = new THREE.MeshMatcapMaterial({ color: 0x000000 });
    const material6 = new THREE.MeshMatcapMaterial({ color: 0xffffff });
    const material8 = new THREE.MeshMatcapMaterial({ color: 0xFF99FF });
    const material10 = new THREE.MeshMatcapMaterial({ color: 0x00aaff });

    const disc1 = new THREE.Mesh(geometry4, material4); scene.add(disc1);
    disc1.position.y = 3;
    disc1.rotation.y += 6;
    const disc2 = new THREE.Mesh(geometry4, material5); scene.add(disc2);
    disc2.position.y = 3;
    disc2.rotation.x += 4;
    disc2.rotation.y += 6;
    const disc3 = new THREE.Mesh(geometry4, material6); scene.add(disc3);
    disc3.position.y = 3;
    disc3.rotation.x += 8;
    disc3.rotation.y += 6;



// GROUPS 
    const group = new THREE.Group();
    group.add(disc1);
    group.add(disc2);
    group.add(disc3);
    group.position.z = -1;
    group.position.x = 0;
    group.position.y = 0;
    group.rotation.x = 0.2;
    group.rotation.y = 1;
    group.rotation.z = 0.8;
    group.scale.set(0.28, 0.28, 0.28);
    group.castShadow = false;
    group.receiveShadow = false;
    scene.add(group);

    function animateZ() {
        requestAnimationFrame(animateZ);
        group.rotation.x += 0.02;
        group.rotation.y -= 0.02;
    }
    animateZ();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasHomePage });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor( 0x2F4464, 1 );
    document.body.appendChild(renderer.domElement);

    // Important to display canvas in the div
    container.appendChild(renderer.domElement);
}

/* function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
} */

function animate() {
    requestAnimationFrame(animate);
    meshes.forEach(mesh => {
        mesh.rotation.x += 0.03;
        mesh.rotation.y += 0.03;
    });

    // remove the background
    const initialBackground = scene.background;
    scene.background = null;

    // reset and render the normal scene
    renderer.setRenderTarget(null);
    scene.background = initialBackground;

    renderer.render(scene, camera);
}