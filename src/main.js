import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/store'



const app=createApp(App)

app.use(store)
app.use(router)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
import 'nprogress/nprogress.css'
import '@/perimission'
import 'virtual:windi.css'
app.mount('#app')
