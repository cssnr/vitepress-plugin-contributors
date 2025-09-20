# Use from Source

::: warning Work in Progress
This guide is not yet complete but should get you started.
:::

You can easily add the source file to your project for full control over the [template](#contributors-component).

[[toc]]

## Contributors Component

Download or copy the [Contributors.vue](https://github.com/cssnr/vitepress-plugin-contributors/blob/master/src/Contributors.vue)
file to your project.

- Source File: [Contributors.vue](https://github.com/cssnr/vitepress-plugin-contributors/blob/master/src/Contributors.vue)
- Target Location: `.vitepress/theme/components/Contributors.vue`

Add these 2 lines to your `index.[js,ts]`.

```javascript [.vitepress/theme/index.js]
import DefaultTheme from 'vitepress/theme'

import Contributors from './components/Contributors.vue' // [!code ++]

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors) // [!code ++]
  },
}
```

See the [Contributors Documentation](../docs/contributors.md) for `<Contributors>` tag usage and examples.

## Get Contributors Script

This can be [installed with npm](get-started.md#install), or you can manually copy it to your project.

The source is available here: [get-contributors](https://github.com/cssnr/vitepress-plugin-contributors/blob/master/src/get-contributors.js)

Make sure to install the dependency, [Commander.js](https://github.com/tj/commander.js).

::: code-group

```shell [npm]
npm i commander
```

```shell [pnpm]
pnpm i commander
```

```shell [yarn]
yarn add commander
```

```shell [bun]
bun i commander
```

:::

See the [Get Contributors Documentation](../docs/get-contributors.md) for details on the `get-contributors` script.

### Dependency Free

If you need a dependency free version of `get-contributors.js` you can build one with [@vercel/ncc](https://www.npmjs.com/package/@vercel/ncc).

::: code-group

```shell [npm]
npm i -g @vercel/ncc
```

```shell [pnpm]
pnpm i -g @vercel/ncc
```

```shell [yarn]
yarn add -g @vercel/ncc
```

```shell [bun]
bun i -g @vercel/ncc
```

:::

Then you can build it like this.

::: code-group

```shell [Normal ~vscode-icons:file-type-shell~]
ncc build src/get-contributors.js -o dist/get-contributors
```

```shell [Minified ~vscode-icons:file-type-shell~]
ncc build -m src/get-contributors.js -o dist/get-contributors
```

:::

The resulting `dist/get-contributors/index.js` can then be run without any dependencies.
