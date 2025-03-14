import { THREE, Scene3D } from '../app';

class AboutPage extends Scene3D {
    constructor(container) {
        super(container);
        console.log('About page scene initializing');
        this.setupEnvironment();
    }

    setupEnvironment() {
        console.log('Setting up about page environment');
        
        // Set scene background
        this.scene.background = new THREE.Color(0x2c3e50);
        this.scene.fog = new THREE.Fog(0x2c3e50, 20, 100);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Add directional light
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 8, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);

        // Create a floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.7,
            metalness: 0.1
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Add grid helper
        const gridHelper = new THREE.GridHelper(20, 20, 0x000000, 0x333333);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Adjust camera
        this.camera.position.set(-15, 15, 15);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        console.log('About page environment setup complete');
    }

    update() {
        // Add any specific update logic for the about page here
    }
}

// Initialize about page when DOM is loaded
console.log('About page script loaded, waiting for DOM');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing about page scene');
    const container = document.getElementById('scene-container');
    if (container) {
        console.log('Found container, creating about page scene');
        window.currentScene = new AboutPage(container);
    } else {
        console.error('Could not find scene container');
    }
}); 