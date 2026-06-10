import DefaultTheme, { VPBadge } from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import 'virtual:group-icons.css'

// noinspection NpmUsedModulesInstalled
import Contributors from '@src/Contributors.vue'
import contributors from '../contributors.json'

import CopyButton from '@cssnr/vitepress-plugin-copybutton'
import '@cssnr/vitepress-plugin-copybutton/style.css'

import chat from 'vitepress-chat'
import 'vitepress-chat/style.css'

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols
/** @type {import('vitepress').Theme} */
export default {
  ...DefaultTheme,

  ...chat(DefaultTheme, {
    api: import.meta.env.VITE_AI_API,
    headers: import.meta.env.VITE_AI_AUTH
      ? { Authorization: import.meta.env.VITE_AI_AUTH }
      : undefined,
    filePath: 'llms.txt',
    showReasoning: true,
  }),

  enhanceApp({ app }) {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Badge', VPBadge)

    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Contributors', Contributors)
    app.config.globalProperties.$contributors = contributors

    app.component('CB', CopyButton)
  },
} satisfies Theme
