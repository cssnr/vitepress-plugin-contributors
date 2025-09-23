---
prev:
  text: 'Get Help'
  link: '/support'
next:
  text: 'Documentation'
  link: '/docs/contributors'
---

# Getting Started

A [VitePress](https://vitepress.dev/) Plugin to Easily generate, update and display repository Contributors.

This [package](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors) includes two components that can be use together or individually.

1. [get-contributors](../docs/get-contributors.md) - script to generate the `contributors.json` file.
2. [Contributors.vue](../docs/contributors.md) - component to display the contributors in VitePress.

Start by [installing](#install) the package, [configuring](#configure) the script and [setting](#setup) up the plugin.

<Contributors :contributors="$contributors" heading="Top 6 VP Contributors" max-users="6" margin="36px 0 0" />

```markdown
<Contributors :contributors="$contributors" heading="Top 6 VP Contributors" max-users="6" margin="36px 0 0" />
```

## Install

<span class="search-keywords">Install or Download from NPM npmjs.com</span>

Install directly to your VitePress from [npmjs](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors) with the following command.

::: code-group

```shell [npm]
npm i @cssnr/vitepress-plugin-contributors
```

```shell [pnpm]
pnpm i @cssnr/vitepress-plugin-contributors
```

```shell [yarn]
yarn add @cssnr/vitepress-plugin-contributors
```

```shell [bun]
bun i @cssnr/vitepress-plugin-contributors
```

:::

_Note: you can also [copy the source](source.md) file to your project._ <Badge type="warning">WIP</Badge>

## Configure

You need to configure the [get-contributors](../docs/get-contributors.md) script to run.

1. Add the [get-contributors](../docs/get-contributors.md) script to your `package.json`.

```json
{
  "scripts": {
    "get-contributors": "npx get-contributors user/repo", // [!code ++]
    "postinstall": "npm run get-contributors" // [!code ++]
  }
}
```

_If you don't add the `postinstall` script you need to add `get-contributors` to your build._

2. Add the `contributors.json` file location to your `.gitignore`.

```txt
.vitepress/contributors.json
```

3. Generate the `contributors.json` file.

::: code-group

```shell [Script ~vscode-icons:file-type-shell~]
npm run get-contributors
```

```shell [Without Script ~vscode-icons:file-type-shell~]
npx get-contributors user/repo
```

:::

<div class="tip custom-block" style="padding-top: 8px">

See the [Get Contributors Documentation](../docs/get-contributors.md) for usage details.

</div>

## Setup

Add these 3-5 lines to your `index.[js,ts]`.

_If you don't have a [.vitepress/theme/index.js](https://vitepress.dev/guide/custom-theme#theme-resolving) file, create one._

```javascript [.vitepress/theme/index.js]
import DefaultTheme, { VPBadge } from 'vitepress/theme' // [!code highlight]

import Contributors from '@cssnr/vitepress-plugin-contributors' // [!code ++]
import '@cssnr/vitepress-plugin-contributors/style.css' // [!code ++]

import contributors from '../contributors.json' // [!code warning]

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Badge', VPBadge) // [!code highlight]

    app.component('Contributors', Contributors) // [!code ++]

    app.config.globalProperties.$contributors = contributors // [!code warning]
  },
}
```

If you are unsure about this [usage](#usage), add these lines for simplicity. <Badge type="warning">Global</Badge>

Only required if you are using the VitePress [Badge](https://vitepress.dev/reference/default-theme-badge#badge). <Badge type="info">VPBadge</Badge>

## Usage

To use, simply add the `<Contributors>` tag to your markdown file (or component).

::: code-group

```vue [Global ~vscode-icons:file-type-text~]
<Contributors :contributors="$contributors" />
```

```vue [Without Global ~vscode-icons:file-type-text~]
<script setup>
import contributors from '../.vitepress/contributors.json'
</script>

<Contributors :contributors="contributors" />
```

:::

<div class="tip custom-block" style="padding-top: 8px">

See the [Contributors Documentation](../docs/contributors.md) for **usage** details and more **examples**.

</div>
