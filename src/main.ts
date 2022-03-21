import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

const app = createApp(App)
app.component('SvgIcon', svgIcon)

app.use(router).use(createPinia()).mount('#app')
