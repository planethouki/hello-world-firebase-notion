import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'

initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG))
console.log('firebase initialized')

const app = createApp(App)

app.use(router)

app.mount('#app')
