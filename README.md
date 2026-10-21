# SEPAC

Sitio institucional de [SEPAC](https://sepacagroaereo.com): equipos de extinción de incendios (agro, industria y náutica) y servicios para aeródromos.

El sitio se genera como HTML estático. No usa base de datos ni backend.

## Stack

- [Astro 7](https://astro.build), salida estática
- React 19 para las partes interactivas (navegación, slider, pie)
- Node.js 22.12 o superior

## Desarrollo

```sh
npm install
npm run dev
```

El servidor local queda en http://localhost:4321.

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve localmente lo generado en `dist/` |

`npm run build` también escribe `dist/sitemap.xml` a partir de las páginas compiladas. La URL canónica está en `site` dentro de `astro.config.mjs`.

## Estructura

```
src/pages/        rutas del sitio
src/components/   layout, navegación y bloques reutilizables
src/styles/       estilos compartidos
public/           imágenes, favicon y cabeceras HTTP (_headers)
```

Rutas principales:

- `/` inicio
- `/sobre-nosotros`
- `/servicios`
- `/contacto`
- `/extincion/sepac-agro`, `/extincion/sepac-industrial`, `/extincion/sepac-nautico`
- `/aerodromos/sei`, `/aerodromos/amg`, `/aerodromos/kit-salvamento`

## Publicación

Se publica el contenido de `dist/`. `node_modules` queda fuera del repositorio (ver `.gitignore`).

En Netlify, `netlify.toml` ya define el comando (`npm run build`), la carpeta (`dist`) y Node 22. En Cloudflare Pages se usa el mismo comando y la misma carpeta de salida. `public/_headers` viaja al build y aplica las cabeceras de seguridad.
