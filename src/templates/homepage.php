<?php
$title = "3D Portfolio - Home";
$pageScript = "home";

ob_start();
?>

<div class="section">
    <div class="backdrop-panel">
        <h1 class="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p class="text-xl text-gray-300 mb-6">
            Explore my work while our friendly character walks around the scene.
            Watch how the 3D animation brings life to this space!
        </p>
        <div class="space-y-4">
            <div class="flex items-center space-x-4">
                <button class="btn-primary" id="toggleAnimation">
                    Pause Animation
                </button>
                <button class="btn-primary" id="resetCharacter">
                    Reset Position
                </button>
            </div>
            <div class="text-sm text-gray-400" id="debugInfo">
                Character Position: <span id="charPosition">x: 0, z: 0</span>
            </div>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
require __DIR__ . '/layout.php';
?> 