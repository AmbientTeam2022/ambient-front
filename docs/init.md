# Quasar Project Creation

Instrucciones de la creación, inicialización y configuración del proyecto con sus dependencias y plugins.

## Prerequisites

- Node 12+ (16.14.2 for this project)
- Yarn v1

You can switch to Yarn 1.x with `yarn set version classic`

## Initializing the project

Initialize repo

    git init -b main

Create Quasar project

    yarn global add @quasar/cli
    yarn create quasar

## Installing PUG

Install `pug` and `pug-plain-loader`:

    yarn add -D pug-plain-loader pug

Add it to webpack in your `quasar.config.js`:

```javascript
chainWebpack(chain) {
  chain
    .plugin("eslint-webpack-plugin")
    .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
  chain.module
    .rule("pug")
    .test(/\.pug$/)
    .use("pug-plain-loader")
    .loader("pug-plain-loader")
    .end();
},
```

Install the Vue Pug Linter Plugin (eslint-plugin-vue):

    yarn add --D eslint@8 eslint-plugin-vue eslint-plugin-vue-pug vue-eslint-parser@next vue-eslint-parser-template-tokenizer-pu

## Config ESLint and Prettier

Add the eslint-plugin-vue to `.eslintrc.js`, before prettier:

```javascript
extends: [
  // "plugin:vue/vue3-essential",
  'plugin:vue-pug/vue3-recommended',
  // "prettier",
],
```

Create a `.prettierrc.json` with the desired prettier rules:

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```
