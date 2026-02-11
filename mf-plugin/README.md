# Strapi Plugin - Module Federation Page Builder

A visual page builder plugin for Strapi 5 that enables composing pages from Module Federation remote components. Build dynamic, micro-frontend powered pages using a drag-and-drop interface directly in the Strapi admin panel.

## Features

- **MF Source Management**: Register and manage Module Federation remote applications
- **Component Discovery**: Automatically fetches and parses component manifests from remotes
- **Visual Page Builder**: Drag-and-drop interface for composing pages from MF components
- **Grid Layout System**: CSS Grid-based layout with configurable columns, rows, and gaps
- **Component Props Editor**: Configure component properties with type-aware inputs
- **Layout Storage**: Persists page layouts with grid configuration
- **Public API**: REST endpoints to serve layouts to frontend applications

## Requirements

- Strapi 5.x
- Node.js >= 18.0.0

## Installation

```bash
npm install strapi-plugin-mf-builder
# or
yarn add strapi-plugin-mf-builder
# or
pnpm add strapi-plugin-mf-builder
```

## Configuration

Add the plugin to your Strapi configuration in `config/plugins.ts`:

```typescript
export default () => ({
  'mf-builder': {
    enabled: true,
  },
});
```

## Usage

### 1. Register an MF Source

1. In Strapi admin, go to **Plugins > Module Federation Page Builder > Sources**
2. Click **Add Source**
3. Enter your MF remote's manifest URL (e.g., `http://localhost:3000/mf-manifest.json`)
4. The plugin will fetch and parse the component manifest automatically

### 2. Create a Page Layout

1. Go to **Plugins > Module Federation Page Builder > Layouts**
2. Click **Create Layout**
3. Enter a name and slug for your page
4. Use the visual builder to:
   - Drag components from the palette onto the canvas
   - Configure component props in the properties panel
   - Adjust grid placement (column, row, span)
5. Save the layout

### 3. API Permissions

Configure public API access in **Settings > Users & Permissions > Roles > Public**:

- `mf-builder.page-layout`: `find`, `findOne`, `findBySlug`
- `mf-builder.mf-source`: `find`, `findOne`

## API Endpoints

### Get Layout by Slug

```
GET /api/mf-builder/page-layouts/slug/:slug
```

### Get All Layouts

```
GET /api/mf-builder/page-layouts
```

### Get All MF Sources

```
GET /api/mf-builder/mf-sources
```

## MF Manifest Format

Your Module Federation remote should expose a manifest at a known URL:

```json
{
  "name": "my-remote",
  "remoteEntry": "http://localhost:3000/remoteEntry.js",
  "scope": "myRemote",
  "components": [
    {
      "name": "Button",
      "exposePath": "./Button",
      "displayName": "Button Component",
      "description": "A reusable button component",
      "category": "UI",
      "props": {
        "label": {
          "type": "string",
          "required": true,
          "default": "Click me"
        },
        "variant": {
          "type": "string",
          "options": ["primary", "secondary"],
          "default": "primary"
        }
      }
    }
  ]
}
```

## Content Types

The plugin creates two content types:

### MF Source (`mf-source`)

| Field       | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| name        | string  | Display name for the source       |
| manifestUrl | string  | URL to the MF manifest            |
| remoteEntry | string  | Remote entry URL (auto-populated) |
| scope       | string  | Container scope name              |
| components  | json    | Parsed component definitions      |
| isActive    | boolean | Whether source is active          |

### Page Layout (`page-layout`)

| Field       | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| name        | string  | Layout display name                     |
| slug        | string  | URL-friendly identifier                 |
| description | text    | Optional description                    |
| layout      | json    | Layout items configuration              |
| gridConfig  | json    | Grid settings (columns, gap, rowHeight) |
| isPublished | boolean | Publication status                      |

## Frontend Integration

Use the layout renderer from our demo project or build your own:

```javascript
// Fetch layout from Strapi
const response = await fetch(`${STRAPI_URL}/api/mf-builder/page-layouts/slug/${slug}`);
const { data } = await response.json();

// data.layout.items contains component placements
// data.gridConfig contains grid settings
```

## Demo & Examples

Check out the full demo project with a Svelte-based layout renderer:
https://github.com/mikiastilahun/strapi-mf-plugin

## License

MIT

## Author

Mikias Tilahun Abebe <mikiastilahun@gmail.com>
