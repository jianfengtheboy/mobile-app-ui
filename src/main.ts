import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from '@/apis'
import 'normalize.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import '@/assets/styles/main.scss'
import vconsole from '@/utils/vconsole'
// import './mock'

window.$apis = apis

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
