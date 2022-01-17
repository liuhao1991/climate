/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-06 11:48:18
 * @Description: ...
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import setupVendor from './vendor/element-v3'
import 'normalize.css'
const app = createApp(App)

setupVendor(app)

app.use(createPinia()).use(router).mount('#app')
