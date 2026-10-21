# SEPAC

Sitio institucional de SEPAC. Se publica como archivos estáticos: no hay base de datos ni servidor propio.

## Verlo en esta computadora

Hace falta [Node.js 22](https://nodejs.org) instalado una sola vez. En la carpeta del proyecto:

```sh
npm install
npm run dev
```

Se abre en http://localhost:4321. Para armar la versión que se sube a internet:

```sh
npm run build
```

El resultado queda en la carpeta `dist`. Esa carpeta es lo único que se publica. No subas `node_modules` ni uses `npm run dev` como sitio público.

## Publicarlo

El camino más simple, sin saber de servidores, es **Cloudflare Pages** o **Netlify**. Los dos son gratis para un sitio como este, incluyen HTTPS y leen el archivo `public/_headers` (cabeceras de seguridad).

### Opción recomendada: Cloudflare Pages

1. Entrá a https://dash.cloudflare.com y creá una cuenta. Activá la verificación en dos pasos.
2. En el menú, abrí **Workers y Pages** → **Crear** → **Pages** → **Subir assets** (o “Direct Upload”).
3. En esta computadora corré `npm run build`.
4. Subí el contenido de la carpeta `dist` (los archivos de adentro, no la carpeta `node_modules`).
5. Cloudflare te da una dirección gratuita terminada en `.pages.dev`. Con eso ya se puede ver el sitio en internet, con HTTPS.

Cuando tengas el dominio propio, en el mismo proyecto de Pages: **Custom domains** → agregar el dominio y seguir los pasos que muestra Cloudflare.

### Otra opción igual de simple: Netlify

1. Cuenta en https://app.netlify.com, con verificación en dos pasos.
2. Corré `npm run build`.
3. Arrastrá la carpeta `dist` a https://app.netlify.com/drop.
4. Te dan una dirección `.netlify.app`. El dominio propio se agrega después en **Domain management**.

Si más adelante conectás el proyecto por Git, `netlify.toml` ya indica que hay que ejecutar `npm run build` y publicar `dist`.

## El dominio

El hosting muestra el sitio. El dominio es el nombre (por ejemplo `sepac.com`). Son dos cosas distintas y se pagan aparte del hosting, que en estas opciones sale cero.

- **`.com`**: se compra en Cloudflare, en el mismo lugar donde está el sitio. Suele ser lo más fácil. Se renueva una vez por año.
- **`.com.ar`**: se registra en https://nic.ar, con los datos de la persona o la empresa. Después hay que apuntar ese dominio al hosting siguiendo las instrucciones de Cloudflare o Netlify. No se compra dentro de Cloudflare.
- **Si ya manejan `grupoaldes.net`**: la opción más corta es pedir un subdominio, por ejemplo `sepac.grupoaldes.net`, a quien administra ese dominio. No hace falta comprar otro nombre.

Guardá la cuenta del dominio con verificación en dos pasos. Si alguien entra a esa cuenta, puede cambiar a dónde apunta el sitio.
