import { createApp } from "vue"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"

import "./style.css"

// Components
import App from "./App.vue"

const app = createApp(App)
const vuetify = createVuetify()
app.use(vuetify)
app.mount("#app")
