import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//创建一个Pinia实例,用于在应用中集中管理状态(store)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
