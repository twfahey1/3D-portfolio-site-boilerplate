# 3D Portfolio Site Boilerplate

A modern, reusable template for creating 3D-enabled portfolio websites using Three.js, PHP, and modern web technologies.

## Features

- 3D scene integration with Three.js
- Responsive design with Tailwind CSS
- Interactive UI with Alpine.js
- Dynamic content loading with HTMX
- PHP-based templating system
- Asset compilation with Laravel Mix

## Prerequisites

- PHP 8.1 or higher
- Node.js 16.0 or higher
- Composer
- npm

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd 3d-portfolio-site-boilerplate
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Build assets:
```bash
npm run dev
```

For development with hot reload:
```bash
npm run watch
```

For production build:
```bash
npm run prod
```

## Project Structure

```
3d-portfolio-site-boilerplate/
├── assets/              # Source assets
│   ├── js/             # JavaScript files
│   ├── css/            # CSS files
│   └── models/         # 3D models
├── public/             # Public directory
├── src/                # PHP source files
└── templates/          # PHP templates
```

## Development

- Add your 3D models to `assets/models/`
- Modify Three.js scene in `assets/js/app.js`
- Add new pages in `public/` and corresponding templates in `src/templates/`
- Style your site using Tailwind classes and custom CSS in `assets/css/styles.css`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License - feel free to use this template for your own projects! 