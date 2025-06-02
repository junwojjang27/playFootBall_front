// src/utils/axios.js
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8068/playFootBall',  // 기본 URL
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // ✅ 인증정보 전달 허용 (쿠키/JWT)
})

export default instance
