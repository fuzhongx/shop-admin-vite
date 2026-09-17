import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'


const app=createApp(App)

app.use(router)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


import 'virtual:windi.css'
app.mount('#app')
