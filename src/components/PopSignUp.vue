<!-- src/components/PopSignUp.vue -->
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <span class="mb10" style="font-size: 25px;">회원가입</span>

      <input v-model="form.userId" placeholder="아이디" />
      <input v-model="form.passwd" type="password" placeholder="비밀번호" />
      <input v-model="form.userNm" placeholder="사용자명" />
      <input v-model="form.nickNm" placeholder="닉네임" />
      <input v-model="form.email" placeholder="이메일" />
      <input v-model="form.phone" placeholder="휴대폰 번호" />
      <input v-model="form.address" placeholder="주소" />
      <input v-model="form.birth" placeholder="생년월일 (YYYYMMDD)" />

      <button @click="submit">가입하기</button>
      <button @click="close">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  data() {
    return {
      form: {
        userId: '',
        passwd: '',
        userNm: '',
        nickNm: '',
        email: '',
        phone: '',
        address: '',
        birth: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async submit() {
      const checkYn = confirm("회원가입 하시겠습니까?");

      if(!checkYn) {
        return;
      }

      // 간단한 유효성 체크
      if (!this.form.userId || !this.form.passwd || !this.form.userNm) {
        alert('필수 항목을 입력하세요.');
        return
      }

      try {
        const response = await this.$axios.post('/login/register', this.form);

        alert(response.data); // ex: "회원가입 완료!" or "이미 존재하는 아이디입니다."
      } catch (error) {
        if (error.response?.status === 409) {
          alert(error.response.data);
        } else {
          console.error(error);
          alert('회원가입 실패');
        }
      }

    }
  }
}
</script>

<!--scoped를 붙이면 해당 컴포넌트에만 적용됨.-->
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.modal-content input {
  margin-bottom: 10px;
  padding: 8px;
}
.modal-content button {
  margin-top: 5px;
}
</style>
