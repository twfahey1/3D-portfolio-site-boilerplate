const mix = require('laravel-mix');

mix.setPublicPath('public')
   .js('assets/js/app.js', 'public/assets/js')
   .js('assets/js/pages/home.js', 'public/assets/js/pages')
   .js('assets/js/pages/about.js', 'public/assets/js/pages')
   .postCss('assets/css/styles.css', 'public/assets/css', [
       require('tailwindcss'),
       require('autoprefixer'),
   ])
   .copyDirectory('assets/models', 'public/assets/models')
   .version();

// Disable manifest generation
mix.options({
    manifest: false
});

// Configure watch options to ignore public directory
mix.webpackConfig({
    watchOptions: {
        ignored: /public/
    }
}); 