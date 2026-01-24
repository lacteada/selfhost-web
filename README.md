# Personal Infrastructure Dashboard

A minimal dashboard for self-hosted services.

## Architecture

- **HTML5 (`index.html`)**: Semantic markup skeleton.
- **Tailwind CSS**: Utility-first styling via CDN for rapid development and clean UI.
- **JavaScript (`assets/js/main.js`)**:
  - Handles dynamic rendering of services from a configuration array (`services`).
  - Manages clipboard interactions and toast notifications.
  - Initializes Lucide icons.
- **Lucide Icons**: Renders SVG icons dynamically. Uses the UMD build for zero-config integration.

## Customization

1. Open `assets/js/main.js`.
2. Add or remove objects in the `services` array:
   ```javascript
   {
       name: "Service Name",
       url: "https://your-service.com",
       desc: "Short description",
       icon: "lucide-icon-name"
   }
   ```
3. Icons can be found at [Lucide.dev](https://lucide.dev/icons).
