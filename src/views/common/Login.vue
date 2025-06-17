<!-- src/views/common/Login.vue -->
<template>
  <div class="flex-container">
    <!-- 왼쪽: 이미지 (70%) -->
    <div class="left-panel">
      <img
          alt="Login Img Son"
          src="@/assets/images/sonChampion.png"
          class="login-image"
      />
    </div>

    <!-- 오른쪽: 로그인 폼 (30%) -->
    <div class="right-panel">
      <div class="mb10 txt-c">
        <img
            alt="PlayFootBall"
            src="@/assets/images/PlayFootBall.png"
            class="play-foot-ball"
            style="width: 250px;"
        />
      </div>
<!--      <div class="mb10 txt-c">-->
<!--        <span class="title">PlayFootBall</span>-->
<!--      </div>-->

      <div class="mb10">
        <input type="text" v-model="userId" placeholder="아이디" />
        <input type="password" v-model="password" placeholder="비밀번호" />
        <button @click="doLogin">로그인</button>
      </div>

      <div>
        <button @click="isModalOpen = true">회원가입</button>
      </div>
    </div>
  </div>

  <SignUpModal v-if="isModalOpen" @close="isModalOpen = false"/>
</template>

<style scoped>
/* 화면 전체 구조 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #eaeef3;
}

.flex-container {
  display: flex;
  height: 100%;
  margin: 10px 40px;
  background-color: #eeeeff;
  border-radius: 10px;
}

/* 왼쪽 이미지 영역 */
.left-panel {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-image {
  width: 70%;
  margin: 105px 0px;
  border-radius: 20px;
}

/* 오른쪽 로그인 영역 */
.right-panel {
  width: 20%;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 40px 0px;
}

/* 타이틀 */
.title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

/* 입력 영역 여백 */
.mb10 {
  margin-bottom: 15px;
}

/* 입력창 */
input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

/* 버튼 스타일 */
button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 5px;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

/* 회원가입 버튼은 서브톤 */
.right-panel > div:last-child button {
  background-color: #6c757d;
}

.right-panel > div:last-child button:hover {
  background-color: #5a6268;
}
</style>

<script>
import PopSignUp from '@/components/PopSignUp.vue'
import router from "@/router";
import Swal from 'sweetalert2'
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
        // alert('아이디를 입력하세요!');
        Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: '아이디와 비밀번호를 입력해주세요.',
          confirmButtonColor: '#007bff',
          confirmButtonText: '확인',
        });

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
        Swal.fire({
          title: '로그인 성공!',
          text: '환영합니다, 사용자님.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

        router.push('/main');

      } catch (error) {
        // ❌ 로그인 실패
        if(error.code == "ERR_BAD_REQUEST") {
          // alert(error.response.data);
          Swal.fire({
            icon: 'warning',
            text: error.response.data,
            confirmButtonColor: '#007bff',
            confirmButtonText: '확인',
          });
        } else {
          alert('서버 오류가 발생했습니다');
          console.error(error);
        }
      }
    }
  }
}
</script>
