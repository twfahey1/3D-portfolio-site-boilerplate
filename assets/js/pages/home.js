import { THREE, Scene3D, GLTFLoader } from '../app';

class HomePage extends Scene3D {
    constructor(container) {
        super(container);
        
        // Character properties
        this.character = null;
        this.mixer = null;
        this.walkingAnimation = null;
        
        // Movement properties
        this.isMoving = false;
        this.targetPosition = new THREE.Vector3();
        this.moveSpeed = 2;
        this.rotationSpeed = 0.1;
        this.idleTimer = 0;
        this.idleDuration = Math.random() * 3 + 2; // 2-5 seconds idle time
        this.walkDuration = Math.random() * 5 + 3; // 3-8 seconds walking time

        // Scene boundaries
        this.floorSize = 20; // Size of the floor
        this.boundaryPadding = 2; // Keep character this far from edges

        // Setup scene elements
        this.setupEnvironment();
        this.loadCharacter();
        this.setupEventListeners();
    }

    setupEnvironment() {
        console.log('Setting up environment');
        // Set scene background
        this.scene.background = new THREE.Color(0x2c3e50);
        this.scene.fog = new THREE.Fog(0x2c3e50, 20, 100);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Add directional light with shadows
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 8, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);

        // Create a floor
        const floorGeometry = new THREE.PlaneGeometry(this.floorSize, this.floorSize);
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
        const gridHelper = new THREE.GridHelper(this.floorSize, 20, 0x000000, 0x333333);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Adjust camera
        this.camera.position.set(-15, 15, 15);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        console.log('Environment setup complete');
    }

    async loadCharacter() {
        console.log('Loading character');
        const loader = new GLTFLoader();
        
        try {
            console.log('Starting GLB load');
            const gltf = await loader.loadAsync('/assets/models/Animation_Walking_withSkin.glb');
            console.log('GLB loaded successfully', gltf);
            
            this.character = gltf.scene;
            this.character.scale.set(1, 1, 1);
            this.character.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            
            this.scene.add(this.character);

            // Setup animation
            this.mixer = new THREE.AnimationMixer(this.character);
            if (gltf.animations.length > 0) {
                console.log('Setting up animation');
                this.walkingAnimation = this.mixer.clipAction(gltf.animations[0]);
                this.walkingAnimation.setLoop(THREE.LoopRepeat);
                this.walkingAnimation.clampWhenFinished = true;
                this.walkingAnimation.play();
                this.walkingAnimation.paused = true;
            }

            // Start the movement cycle
            this.startMovementCycle();
            console.log('Character setup complete');

        } catch (error) {
            console.error('Error loading character:', error);
        }
    }

    startMovementCycle() {
        this.isMoving = false;
        this.idleTimer = 0;
        this.updateTargetPosition();
    }

    updateTargetPosition() {
        const boundarySize = this.floorSize - this.boundaryPadding * 2;
        const radius = boundarySize / 2; // Maximum distance from center
        const angle = Math.random() * Math.PI * 2;
        
        // Calculate new target within boundaries
        this.targetPosition.x = Math.max(-radius, Math.min(radius, Math.cos(angle) * radius * Math.random()));
        this.targetPosition.z = Math.max(-radius, Math.min(radius, Math.sin(angle) * radius * Math.random()));
    }

    moveCharacter(delta) {
        if (!this.character || !this.isMoving) return;

        const currentPos = this.character.position;
        const direction = new THREE.Vector3()
            .subVectors(this.targetPosition, currentPos)
            .normalize();

        // Calculate the angle to the target
        const targetAngle = Math.atan2(direction.x, direction.z);
        const currentAngle = this.character.rotation.y;

        // Smoothly rotate towards the target
        let angleDiff = targetAngle - currentAngle;
        if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        this.character.rotation.y += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), this.rotationSpeed);

        // Move forward
        const moveDistance = this.moveSpeed * delta;
        this.character.position.x += direction.x * moveDistance;
        this.character.position.z += direction.z * moveDistance;

        // Check if we've reached the target
        const distance = currentPos.distanceTo(this.targetPosition);
        if (distance < 0.1) {
            this.isMoving = false;
            this.idleTimer = 0;
            if (this.walkingAnimation) {
                this.walkingAnimation.paused = true;
            }
        }
    }

    setupEventListeners() {
        // Add any additional event listeners here
        const toggleBtn = document.getElementById('toggleAnimation');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.isMoving = !this.isMoving;
                if (this.walkingAnimation) {
                    this.walkingAnimation.paused = !this.isMoving;
                }
                toggleBtn.textContent = this.isMoving ? 'Pause Animation' : 'Resume Animation';
            });
        }

        const resetBtn = document.getElementById('resetCharacter');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (this.character) {
                    this.character.position.set(0, 0, 0);
                    this.updateTargetPosition();
                }
            });
        }
    }

    updateCharacterState(delta) {
        if (!this.character) return;

        this.idleTimer += delta;

        if (this.isMoving) {
            if (this.idleTimer >= this.walkDuration) {
                // Stop walking
                this.isMoving = false;
                this.idleTimer = 0;
                this.idleDuration = Math.random() * 3 + 2; // New random idle duration
                if (this.walkingAnimation) {
                    this.walkingAnimation.paused = true;
                }
            }
        } else {
            if (this.idleTimer >= this.idleDuration) {
                // Start walking
                this.isMoving = true;
                this.idleTimer = 0;
                this.walkDuration = Math.random() * 5 + 3; // New random walk duration
                this.updateTargetPosition();
                if (this.walkingAnimation) {
                    this.walkingAnimation.paused = false;
                }
            }
        }

        // Update position display
        const posDisplay = document.getElementById('charPosition');
        if (posDisplay) {
            posDisplay.textContent = `x: ${this.character.position.x.toFixed(2)}, z: ${this.character.position.z.toFixed(2)}`;
        }
    }

    // This method is called by the base class's animation loop
    update(delta) {
        // Update character animation
        if (this.mixer) {
            this.mixer.update(delta);
        }

        // Update character state and movement
        this.updateCharacterState(delta);
        this.moveCharacter(delta);
    }
}

// Initialize homepage when DOM is loaded
console.log('Home page script loaded, waiting for DOM');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing scene');
    const container = document.getElementById('scene-container');
    if (container) {
        console.log('Found container, creating scene');
        window.currentScene = new HomePage(container);
    } else {
        console.error('Could not find scene container');
    }
}); 