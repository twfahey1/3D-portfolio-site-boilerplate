<?php
// Ensure these variables are set
$title = $title ?? '3D Portfolio';
$pageScript = $pageScript ?? null;
$content = $content ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>
    <!-- Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <!-- HTMX -->
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <!-- Styles -->
    <link rel="stylesheet" href="/assets/css/styles.css">
    <!-- Three.js and scene setup -->
    <script type="module" src="/assets/js/app.js"></script>
    <?php if ($pageScript): ?>
        <script type="module" src="/assets/js/pages/<?= htmlspecialchars($pageScript) ?>.js"></script>
    <?php endif; ?>
</head>
<body class="bg-gray-900 text-white" x-data="{ mobileMenuOpen: false }">
    <!-- 3D Scene Container -->
    <div id="scene-container"></div>

    <!-- Content Wrapper -->
    <div class="content-wrapper">
        <!-- Navigation -->
        <nav class="nav-container">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="text-xl font-bold">Portfolio</a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="/" class="btn-primary">Home</a>
                            <a href="/about.php" class="btn-primary">About</a>
                        </div>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button @click="mobileMenuOpen = !mobileMenuOpen" class="btn-primary">
                            Menu
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div class="md:hidden" x-show="mobileMenuOpen" x-cloak>
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/" class="block btn-primary">Home</a>
                    <a href="/about.php" class="block btn-primary">About</a>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-grow">
            <?= $content ?>
        </main>

        <!-- Footer -->
        <footer class="footer-container">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
                <p>&copy; <?= date('Y') ?> Your Name. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <script>
        // Handle scene cleanup when navigating away
        document.addEventListener('htmx:beforeSwap', function(evt) {
            if (window.currentScene && window.currentScene.destroy) {
                window.currentScene.destroy();
                window.currentScene = null;
            }
        });
    </script>
</body>
</html> 