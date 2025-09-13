[![NPM Downloads](https://img.shields.io/npm/dw/%40cssnr%2Fvitepress-plugin-contributors?logo=npm)](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors)
[![NPM Version](https://img.shields.io/npm/v/%40cssnr%2Fvitepress-plugin-contributors?logo=npm)](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/releases/latest)
[![GitHub Deployments](https://img.shields.io/github/deployments/cssnr/vitepress-plugin-contributors/npm?logo=npm&label=deploy)](https://github.com/cssnr/vitepress-plugin-contributors/deployments)
[![Release](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-plugin-contributors/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/vitepress-plugin-contributors/actions/workflows/release.yaml)
[![Lint](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-plugin-contributors/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/vitepress-plugin-contributors/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/pulse)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/min/%40cssnr%2Fvitepress-plugin-contributors?logo=npm)](https://bundlephobia.com/package/@cssnr/vitepress-plugin-contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/vitepress-plugin-contributors?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/vitepress-plugin-contributors)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/vitepress-plugin-contributors?logo=htmx&logoColor=white)](https://github.com/cssnr/vitepress-plugin-contributors)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/discussions)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/vitepress-plugin-contributors?style=flat&logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# VitePress Plugin Contributors

- [Install](#Install)
- [Usage](#Usage)
- [Options](#Options)
- [Support](#Support)
- [Contributing](#Contributing)

A [VitePress](https://vitepress.dev/) Plugin to Easily generate, update and display repository Contributors.

This [package](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors) includes two components that can be use together or individually.

1. [get-contributors](src/get-contributors.js) - script to generate the `contributors.json` file.
2. [Contributors.vue](src/Contributors.vue) - component to display the contributors in VitePress.

Additionally, this includes detailed [Install](#install) guide, plus [Support](#support).

## Install

1. Install directly into your VitePress with [npm](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors).

```shell
npm i @cssnr/vitepress-plugin-contributors
```

2. Add the [get-contributors](src/get-contributors.js) script to your `package.json`.

```json
{
  "scripts": {
    "get-contributors": "npx get-contributors user/repo",
    "postinstall": "npm run get-contributors"
  }
}
```

If you don't add the `postinstall` script you need to add `npm run get-contributors` to your build.

<details><summary>Click Here to View Usage - <b>get-contributors</b></summary>

&nbsp;

Display Help: `npx get-contributors -h`

Basic usage, all contributors excluding bot users.

```shell
npx get-contributors user/repo
```

Limit to top 20 contributors, specify output file, and include bot users.

```shell
npx get-contributors user/repo -m 20 -f .vitepress/contributors.json -b
```

Only the `user/repo` is required. All other arguments are optional.

| Argument&nbsp;Flag    | Default&nbsp;Value             | Description&nbsp;of&nbsp;the&nbsp;Argument |
| :-------------------- | :----------------------------- | :----------------------------------------- |
| `-f` or `--file`      | `.vitepress/contributors.json` | Output file relative to project root       |
| `-m` or `--max-users` | `0`                            | Max users to fetch, 0 is unlimited         |
| `-b` or `--bots`      | `false`                        | Include bot users in the results           |

---

</details>

3. Add the `contributors.json` file location to your `.gitignore`.

```gitignore
.vitepress/contributors.json
```

4. Generate the `contributors.json` file.

```shell
npm run get-contributors
```

Alternatively, if you did not add the `get-contributors` script from step 2:

```shell
npx get-contributors user/repo
```

5. Import the components in your `.vitepress/theme/index.js`.

```javascript
import DefaultTheme, { VPBadge } from 'vitepress/theme' // only if using VPBadge

import Contributors from '@cssnr/vitepress-plugin-contributors' // ADD this line
import '@cssnr/vitepress-plugin-contributors/style.css' // ADD this line

import contributors from '../contributors.json' // OPTIONAL - Global

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Badge', VPBadge) // only if using VPBadge
    app.component('Contributors', Contributors) // ADD this line
    app.config.globalProperties.$contributors = contributors // OPTIONAL - Global
  },
}
```

`Global` - If you are unsure about this, add these lines for simplicity.

`VPBadge` - Only required if you are using the VitePress [Badge](https://vitepress.dev/reference/default-theme-badge#badge).

Note, you may need to modify the `../contributors.json` import location to match your setup.
If your VitePress configuration directory is located at `.vitepress` then the default output
path of `.vitepress/contributors.json` will import from the relative path `../contributors.json`.

If you are not importing `contributors` as a Global, this path will be relative to the file you are importing it in.

6. Finally, use the [Contributors.vue](src/Contributors.vue) component in your markdown.

```markdown
<Contributors :contributors="$contributors" />
```

See the [Usage](#usage) for more details...

## Usage

If you added `contributors` as a global component, you only need the `<Contributors>` tag.

```markdown
<Contributors :contributors="$contributors" />
```

Otherwise, import the `contributors.json` and add a `<Contributors>` tag.

```markdown
<script setup>
import contributors from '../.vitepress/contributors.json'
</script>

<Contributors :contributors="contributors" />
```

See the [Options](#options) for more details...

## Options

Only the `:contributors` parameter is required, everything else is optional.

| Parameter         |   Default    |  Type  | Description&nbsp;of&nbsp;the&nbsp;Parameter                                                |
| :---------------- | :----------: | :----: | :----------------------------------------------------------------------------------------- |
| **:contributors** | **Required** | Array  | `contributors.json` file import data                                                       |
| **max-users**     |      -       | String | Max Number of users to display                                                             |
| **heading**       |      -       | String | Optional Heading text                                                                      |
| **size**          |     `64`     | String | Size of Icons in pixels                                                                    |
| **margin**        |      -       | String | [CSS margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) string for container |

Example with all arguments.

```markdown
<Contributors
    :contributors="$contributors"
    heading="Contributors"
    max-users="100"
    size="48"
    margin="36px 0 96px"
/>
```

## Support

Please let us know if you run into any [issues](https://github.com/cssnr/vitepress-plugin-contributors/issues)
or want to see [a new feature](https://github.com/cssnr/vitepress-plugin-contributors/discussions/categories/feature-requests).

For general help or to request a feature:

- Q&A Discussion: [discussions/q-a](https://github.com/cssnr/vitepress-plugin-contributors/discussions/categories/q-a)
- Request a Feature: [discussions/feature-requests](https://github.com/cssnr/vitepress-plugin-contributors/discussions/categories/feature-requests)

If you are experiencing an issue/bug or getting unexpected results:

- Report an Issue: https://github.com/cssnr/vitepress-plugin-contributors/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=VitePress%20Plugin%20Contributors)

# Contributing

For instructions on creating a PR, see the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
