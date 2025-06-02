<!-- PageHeader.vue -->
<template>
  <footer>
    Header
    <div>
      토큰 만료까지 남은 시간: {{ remaining }}초
    </div>
    <div>
      <button @click="refreshToken">연장</button>
      <button @click="logout" >로그아웃</button>
    </div>
  </footer>
  <hr/>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import router from "@/router";
import axios from '@/utils/axios';
import { getTokenRemainingSeconds } from '@/utils/jwt';

export default {
  name: 'Header',
  setup() {
    const remaining = ref(0);
    let intervalId = null;

    function updateRemaining() {
      const token = localStorage.getItem('token');
      remaining.value = token ? getTokenRemainingSeconds(token) : 0;
    }

    onMounted(() => {
      updateRemaining();
      intervalId = setInterval(() => {
        updateRemaining();
        if (remaining.value === 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    async function refreshToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/jwt/refresh', {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem('token', response.data);
        alert('세션이 연장되었습니다.');
        updateRemaining(); // 남은 시간 즉시 갱신
      } catch (error) {
        alert('세션 연장에 실패했습니다. 다시 로그인해주세요.');
        localStorage.removeItem('token');
        router.push('/login');
      }
    }

    // 로그아웃 함수
    function logout() {
      localStorage.removeItem('token');
      router.push('/login');
    }

    return { remaining, logout, refreshToken };
  }
};
</script>

<style scoped>

</style>