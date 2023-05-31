import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAccount } from '@mdi/js'


import './assets/main.css'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases: {
          ...aliases,
          account: mdiAccount,
        },
        sets: {
          mdi,
        },
    },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
