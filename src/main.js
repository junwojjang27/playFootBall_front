// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//axios 인스턴스, 이게 있어야 각 화면에서 this.$axios로 사용 가능
import axios from '@/utils/axios'

const app = createApp(App)

// 전역 속성으로 등록
app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
