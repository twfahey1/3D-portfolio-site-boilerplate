import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log('Base app.js loaded');

class Scene3D {
    constructor(container) {
        console.log('Initializing base Scene3D');
        this.container = container;

        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Setup scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );

        // Setup controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2.1;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 50;

        // Setup clock for animations
        this.clock = new THREE.Clock();

        // Bind methods
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize);

        // Start animation loop
        this.animate();
        
        console.log('Base Scene3D initialization complete');
    }

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        
        // Update controls
        this.controls.update();

        // Call update method if it exists
        if (this.update) {
            this.update(delta);
        }

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        console.log('Destroying scene');
        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize);

        // Dispose of Three.js objects
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });

        // Remove renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }

        // Clear references
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.renderer = null;
        
        console.log('Scene destroyed');
    }
}

// Export necessary modules
export { THREE, Scene3D, GLTFLoader }; 