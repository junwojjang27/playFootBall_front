<!-- src/views/common/Login.vue -->
<template>
  <div class="mb10">
    <span style="font-size: 30px;">PlayFootBall</span>
  </div>

  <div class="mb10">
    <img alt="Login Img Son" src="@/assets/images/sonChampion.png" style="width: 800px;">
  </div>

  <div class="mb10">
    <input type="text" v-model="userId" placeholder="아이디"/>
    <input type="password" v-model="password" placeholder="비밀번호">
    <button @click="doLogin">로그인</button>
  </div>

  <div>
    <button @click="isModalOpen = true" >회원가입</button>
  </div>

  <SignUpModal v-if="isModalOpen" @close="isModalOpen = false"/>
</template>

<script>
import PopSignUp from '@/components/PopSignUp.vue'
import router from "@/router";
export default {
  name: 'Login',
  components: { SignUpModal: PopSignUp },
  data() {
    return {
      isModalOpen: false,
      userId: '',
      password: ''
    }
  },
  methods: {
    async doLogin() {
      if (!this.userId) {
        alert('아이디를 입력하세요!');
        return
      }

      try {
        const response = await this.$axios.post('/login/login', {
          userId: this.userId,
          passwd: this.password
        });

        const token = response.data.token;
        // ✅ 여기서 localStorage에 저장!
        localStorage.setItem('token', token);

        // console.log(response.data);
        router.push('/main')

      } catch (error) {
        // ❌ 로그인 실패
        if(error.code == "ERR_BAD_REQUEST") {
          alert(error.response.data);
        } else {
          alert('서버 오류가 발생했습니다');
          console.error(error);
        }
      }
    }
  }
}
</script>
