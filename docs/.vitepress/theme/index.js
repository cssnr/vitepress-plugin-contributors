import DefaultTheme, { VPBadge } from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'

// noinspection NpmUsedModulesInstalled
import Contributors from '@src/Contributors.vue'
import contributors from '../contributors.json'

import CopyButton from '@cssnr/vitepress-plugin-copybutton'
import '@cssnr/vitepress-plugin-copybutton/style.css'

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols
/** @type {import('vitepress').Theme} */
export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        app.component('Badge', VPBadge)

        app.component('Contributors', Contributors)
        app.config.globalProperties.$contributors = contributors

        app.component('CB', CopyButton)
    },
}
