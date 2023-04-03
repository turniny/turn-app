import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()

// 为pinia挂载方法
// pinia.use()

app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.warn('组件级别错误', err)
}

// 全局方法挂载

// 全局组件挂载

app.use(pinia)
app.use(router)

app.mount('#app')
