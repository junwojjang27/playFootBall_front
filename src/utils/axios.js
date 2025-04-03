// src/utils/axios.js
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8088/playFootBall',  // 기본 URL
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance
