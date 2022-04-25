# Ambient (ambient-front)

Frontend del proyecto Ambient

## Requisitos

- GIT. [Instalación para Windows](https://git-scm.com/download/win).

- Node. Versión LTS: [16.14.2](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi).

- Yarn v1. Luego de instalar Node, actívalo en consola de admin:

```bash
corepack enable
yarn set version classic
```

- Quasar CLI

```bash
yarn global add @quasar/cli
```

## Instalación

Clona este repositorio, por ejemplo desde una carpeta `/ambient/`:

```bash
git clone https://github.com/AmbientTeam2022/ambient-front.git
```

Se creará el subdirectorio `/ambient/ambient-front/`

Instala las dependencias de Node usando Yarn:

```bash
yarn
```

Crea un archivo `.env` en la raíz del proyecto (`ambient-front`). Copia el siguiente contenido:

```
VUE_APP_API_URL="http://127.0.0.1:8000"
```

## Arranque

### Compilar para desarrollo

Usa este comando para probar la App. Los cambios que guardes se aplicarán automáticamente.

```bash
quasar dev
```

### Compilar para producción

```bash
quasar build
```

### Lintear

```bash
yarn lint
```

### Formatear

```bash
yarn format
```

## Herramientas

Se recomiendan las siguientes extensiones para VSCode. Debería preguntarte si quieres instalarlas.

- ESLint
- Prettier
- EditorConfig for VS Code
- Vue Language Features (Volar)
- Vue VSCode Snippets
- Sass
- GitLens
- TODO Highlight

## Otros

### [Inicialización](docs/init.md)

Instrucciones de la creación del proyecto desde cero, para futura referencia.
