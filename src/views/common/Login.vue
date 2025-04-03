<!-- src/views/common/Login.vue -->
<template>
  <div class="mb10">
    <span style="font-size: 30px;">PlayFootBall</span>
  </div>

  <div class="mb10">
    <img alt="Login Img Son" src="@/assets/images/loginImg.jpg" style="width: 1000px;">
  </div>

  <div class="mb10">
    <input type="text" v-model="userId" placeholder="아이디"/>
    <input type="password" placeholder="비밀번호">
    <button @click="doLogin">로그인</button>
  </div>

  <div>
    <button @click="isModalOpen = true" >회원가입</button>
  </div>

  <SignUpModal v-if="isModalOpen" @close="isModalOpen = false"/>
</template>

<script>
import PopSignUp from '@/components/PopSignUp.vue'
export default {
  name: 'Login',
  components: { SignUpModal: PopSignUp },
  data() {
    return {
      isModalOpen: false,
      userId: ''
    }
  },
  methods: {
    async doLogin() {
      if (!this.userId) {
        alert('아이디를 입력하세요!');
        return
      }

      try {
        const response = await this.$axios.get('/login/login', {
          params: { userId: this.userId }
        })

        if (response.data.exists) {
          alert('아이디 존재!');
        } else {
          alert('아이디가 없습니다!');
        }
      } catch (error) {
        alert('서버 오류가 발생했습니다');
        console.error(error);
      }
    }
  }
}
</script>
