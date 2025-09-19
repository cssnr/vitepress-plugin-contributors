---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Contributors
  text: VitePress Plugin
  tagline: A VitePress Plugin to Easily Generate, Update and Display GitHub Contributors.
  image:
    src: /images/logo.png
    alt: VitePress Contributors
  actions:
    - text: Get Started
      link: /guides/get-started
      theme: brand
    - text: Documentation
      link: /docs/contributors
      theme: alt
    - text: Support
      link: /support
      theme: alt

features:
  - title: Install and Setup
    details: View Setup and Usage Guides
    link: /guides/get-started
  - title: Documentation
    details: View the Documentation
    link: /docs/contributors
  - title: Get Support
    details: Get Help with Anything
    link: /support
---

<div class="badges">

[![NPM Downloads](https://img.shields.io/npm/dw/%40cssnr%2Fvitepress-plugin-contributors?logo=npm)](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors)
[![NPM Version](https://img.shields.io/npm/v/%40cssnr%2Fvitepress-plugin-contributors?logo=npm)](https://www.npmjs.com/package/@cssnr/vitepress-plugin-contributors)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/releases)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/min/%40cssnr%2Fvitepress-plugin-contributors?logo=bookstack&logoColor=white)](https://bundlephobia.com/package/@cssnr/vitepress-plugin-contributors)
[![Deployments NPM](https://img.shields.io/github/deployments/cssnr/vitepress-plugin-contributors/npm?logo=npm&label=release)](https://github.com/cssnr/vitepress-plugin-contributors/deployments/npm)
[![Deployments Pages](https://img.shields.io/github/deployments/cssnr/vitepress-plugin-contributors/docs?logo=vitepress&logoColor=white&label=docs)](https://github.com/cssnr/vitepress-plugin-contributors/deployments/docs)
[![WF Release](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-plugin-contributors/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/vitepress-plugin-contributors/actions/workflows/release.yaml)
[![WF Lint](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-plugin-contributors/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/vitepress-plugin-contributors/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/vitepress-plugin-contributors?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/vitepress-plugin-contributors?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/vitepress-plugin-contributors?logo=htmx&logoColor=white)](https://github.com/cssnr/vitepress-plugin-contributors/tree/master/src)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/vitepress-plugin-contributors?logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/discussions)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/vitepress-plugin-contributors?style=flat&logo=github)](https://github.com/cssnr/vitepress-plugin-contributors/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

</div>

<Contributors :contributors="$contributors" heading="VitePress Contributors" size="48" margin="36px 0 96px" />

<style>
.badges > p {
    margin-top: 80px;
    text-align: center;
}

.badges img {
    display: inline-block;
    vertical-align: middle;
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
}
.badges img:hover {
    transform: scale(1.05);
}
</style>
