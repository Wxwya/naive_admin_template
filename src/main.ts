import { createApp } from 'vue'
import './style.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
// import Vconsole from 'vconsole'

import init from "@/plugins"
import App from './App.vue'
const app = createApp(App)
init(app)
// let vConsole = new Vconsole()
app.mount('#app')
