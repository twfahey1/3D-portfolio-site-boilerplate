<?php
$title = "About - 3D Portfolio";
$pageScript = "about";

ob_start();
?>

<div class="section">
    <div class="backdrop-panel">
        <h1 class="text-4xl font-bold mb-4">About Me</h1>
        <p class="text-xl text-gray-300 mb-6">
            Welcome to my 3D-enabled portfolio site. I'm passionate about creating immersive web experiences
            that combine modern web technologies with interactive 3D graphics.
        </p>
        <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Technologies Used</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
                <li>Three.js for 3D graphics</li>
                <li>PHP with modern practices</li>
                <li>Tailwind CSS for styling</li>
                <li>Alpine.js for interactivity</li>
                <li>Laravel Mix for asset compilation</li>
            </ul>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
require __DIR__ . '/layout.php';
?> 