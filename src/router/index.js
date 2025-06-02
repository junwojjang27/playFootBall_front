// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/common/Login.vue'
import Main from '@/views/common/Main.vue'
import axios from '@/utils/axios' // ✅ axios 인스턴스 가져오기
import { getTokenRemainingSeconds } from '@/utils/jwt';

const routes = [
    { path: '/login',   name: 'Login',  component: Login }, //로그인페이지
    { path: '/main',    name: 'Main',   component: Main,    meta: { requiresAuth: true }}  // 메인화면 ✅인증 필요 표시
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ 전역 네비게이션 가드 + API 유효성 체크
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            alert('로그인이 필요한 페이지입니다.');
            return next('/login');
        }

        const remaining = getTokenRemainingSeconds(token);

        if (remaining > 0) {
            try {
                const response = await axios.get('/jwt/refresh', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                localStorage.setItem('token', response.data); // 새 토큰 저장
            } catch (err) {
                localStorage.removeItem('token');
                alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                return next('/login');
            }
        }

        try {
            // 🔥 백엔드에 토큰 유효성 확인 요청
            await axios.get('/jwt/check', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            next(); // 유효한 토큰이면 통과

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('[JWT 만료] 토큰이 만료되었거나 유효하지 않음:', error.response);
            } else {
                console.error('[JWT 오류] 알 수 없는 인증 오류:', error);
            }

            // 만료 또는 유효하지 않은 토큰
            localStorage.removeItem('token');
            alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
            next('/login');
        }
    } else {
        next();
    }
});

export default router
