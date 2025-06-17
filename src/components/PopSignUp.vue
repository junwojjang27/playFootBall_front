<!-- src/components/PopSignUp.vue -->
<template>
  <transition name="popup">
    <div class="modal-overlay" v-if="visible">
      <div class="modal-content">
        <span class="mb10" style="font-size: 25px;">회원가입</span>

<!--        <input v-model="form.userId" placeholder="아이디" />-->
        <!-- 아이디 입력 + 중복 확인 버튼 묶음 -->
        <div class="input-group">
          <input v-model="form.userId" placeholder="아이디" @input="validateUserId" :disabled="isUserIdChecked"/>
          <button type="button" v-show="!isUserIdChecked" class="chkBtn" @click="checkDuplicateId">중복 체크</button>
          <button type="button" v-show="isUserIdChecked" class="chkBtn" @click="changeUserId">변경</button>
        </div>
        <span v-show="userIdMsg1" class="validationMsg">아이디는 6~12자의 영문,숫자만 사용 가능합니다.</span>
        <span v-show="userIdMsg2" class="validationMsg">아이디 중복을 체크해 해주세요.</span>
        <input v-model="form.passwd" type="password" placeholder="비밀번호" @input="validatePassword"/>
        <span v-show="passwdMsg1" class="validationMsg">비밀번호는 8~20자 이내로 입력하셔야 합니다.</span>
        <span v-show="passwdMsg2" class="validationMsg">반드시 숫자, 특수문자, 영문자 중 2가지 이상 사용해야 합니다.</span>
        <input v-model="form.passwdChk" type="password" placeholder="비밀번호 확인" @input="validatePasswdChk"/>
        <span v-show="passwdChkMsg" class="validationMsg">비밀번호가 일치하지 않습니다.</span>
        <input v-model="form.userNm" placeholder="사용자명" @input="validateUserNm" @blur="onUserNmBlur"/>
        <span v-show="userNmMsg" class="validationMsg">사용자명은 2자~5자 이내의 한글만 사용 가능합니다.</span>
        <div class="input-group">
          <input v-model="form.nickNm" placeholder="닉네임" @input="validateNickNm" :disabled="isNickNmChecked"/>
          <button type="button" v-show="!isNickNmChecked" class="chkBtn" @click="checkDuplicateNickNm">중복 체크</button>
          <button type="button" v-show="isNickNmChecked" class="chkBtn" @click="changeNickNm">변경</button>
        </div>
        <span v-show="nickNmMsg1" class="validationMsg">닉네임은 2자~10자 이내로 입력하셔야 합니다.</span>
        <span v-show="nickNmMsg2" class="validationMsg">닉네임 중복을 체크해 해주세요.</span>
        <input v-model="form.email" placeholder="이메일" @input="validateEmail"/>
        <span v-show="emailMsg" class="validationMsg">이메일 형식이 올바르지 않습니다.</span>
        <input v-model="form.phone" placeholder="휴대폰 번호" @input="validatePhone"/>
        <span v-show="phoneMsg" class="validationMsg">휴대폰 번호가 올바르지 않습니다.</span>
<!--        <input v-model="form.address" placeholder="주소" />
        <span v-show="addressMsg" class="validationMsg"></span>-->
        <input v-model="form.birth" placeholder="생년월일 (YYYYMMDD)" @input="validateBirth"/>
        <span v-show="birthMsg" class="validationMsg">생년월일이 올바르지 않습니다. (YYYYMMDD)</span>

        <button @click="submit">가입하기</button>
        <button @click="close">닫기</button>
      </div>
    </div>
  </transition>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  emits: ['close'],
  data() {
    return {
      visible: false,
      userIdMsg1: false,
      userIdMsg2: false,
      passwdMsg1: false,
      passwdMsg2: false,
      passwdChkMsg : false,
      userNmMsg: false,
      nickNmMsg1: false,
      nickNmMsg2: false,
      emailMsg: false,
      phoneMsg: false,
      addressMsg: false,
      birthMsg: false,
      form: {
        userId: '',
        passwd: '',
        passwdChk: '',
        userNm: '',
        nickNm: '',
        email: '',
        phone: '',
        address: '',
        birth: ''
      },
      isUserIdChecked: false,
      isNickNmChecked: false,
    }
  },
  mounted() {
    this.visible = true;
  },
  methods: {
    //아이디 중복 체크
    checkDuplicateId() {
      this.isUserIdChecked = true;
      this.userIdMsg2 = false;

      let test = true;
      if(test) {
        Swal.fire({
          title: '사용가능한 아이디입니다!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: '중복된 아이디입니다.',
          confirmButtonColor: '#007bff',
          confirmButtonText: '확인',
        });
      }
    },
    changeUserId() {
      this.isUserIdChecked = false;
      this.userIdMsg2 = true;
    },
    //닉네임 중복 체크
    checkDuplicateNickNm() {
      this.isNickNmChecked = true;
      this.nickNmMsg2 = false;

      let test = true;
      if(test) {
        Swal.fire({
          title: '사용가능한 닉네임입니다!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: '중복된 닉네임입니다.',
          confirmButtonColor: '#007bff',
          confirmButtonText: '확인',
        });
      }
    },
    changeNickNm() {
      this.isNickNmChecked = false;
      this.nickNmMsg2 = true;
    },
    //아이디 체크
    validateUserId() {
      this.userIdMsg2 = true;
      if(!this.form.userId) {
        this.userIdMsg1 = false;
        this.userIdMsg2 = false;
        return false;
      }

      const regex = /^[A-Za-z0-9]{6,12}$/;

      // 정규식 통과 여부로 userIdMsg1 설정
      if (!regex.test(this.form.userId)) {
        this.userIdMsg1 = true;
      } else {
        this.userIdMsg1 = false;
      }

      // 아이디가 변경되었으면 중복확인도 다시 하게 강제
      // this.userIdMsg2 = false;
    },
    //비밀번호 체크
    validatePassword() {
      if(!this.form.passwd) {
        this.passwdMsg1 = false;
        this.passwdMsg2 = false;
        return false;
      }

      const pw = this.form.passwd;
      const len = pw.length;

      // 길이 검사 (8~20자)
      this.passwdMsg1 = !(len >= 8 && len <= 20);

      // 조합 검사 (영문, 숫자, 특수문자 중 2종류 이상)
      let count = 0;
      if (/[a-zA-Z]/.test(pw)) count++;
      if (/\d/.test(pw)) count++;
      if (/[^a-zA-Z0-9]/.test(pw)) count++;

      this.passwdMsg2 = count < 2;

      // 비밀번호 변경되면 비밀번호 확인도 다시 검증
      this.validatePasswdChk();
    },
    //비밀번호 확인 체크
    validatePasswdChk() {
      if(this.form.passwdChk) {
        this.passwdChkMsg = this.form.passwdChk !== this.form.passwd;
      } else {
        this.passwdChkMsg = false;
      }
    },
    //사용자명 체크
    validateUserNm(event) {
      // 한글 문자만 남기고 모두 제거
      this.form.userNm = this.form.userNm.replace(/[^가-힣]/g, '');

      if(!event.target.value) {
        this.userNmMsg = false;
        return false;
      }

      // 길이 유효성 검사
      const len = event.target.value.length;
      this.userNmMsg = !(len >= 2 && len <= 5);
    },
    onUserNmBlur() {
      if(!this.form.userNm) {
        this.userNmMsg = false;
        return false;
      }

      // 길이 유효성 검사
      const len = this.form.userNm.length;
      this.userNmMsg = !(len >= 2 && len <= 5);
    },
    //닉네임 체크
    validateNickNm(event) {
      this.nickNmMsg2 = true;
      if(!event.target.value) {
        this.nickNmMsg1 = false;
        this.nickNmMsg2 = false;
        return false;
      }

      const len = this.form.nickNm.length;

      if (len < 2 || len > 10) {
        this.nickNmMsg1 = true;
        // this.isNickNmValid = false;
      } else {
        this.nickNmMsg1 = false;
        // this.isNickNmValid = true;
      }

      // 입력 변경 시 중복 확인 무효화
      // this.isNickNmChecked = false;
      // this.nickNmMsg2 = false;
    },
    //이메일 체크
    validateEmail() {
      if(!this.form.email) {
        this.emailMsg = false;
        return false;
      }

      this.form.email = this.form.email.replace(/[ㄱ-힣]/g, '');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailMsg = !emailRegex.test(this.form.email);
    },
    //휴대폰 체크
    validatePhone() {
      // 숫자만 남기고 나머지 문자 제거
      this.form.phone = this.form.phone.replace(/\D/g, '');

      if(!this.form.phone) {
        this.phoneMsg = false;
        return false;
      }

      const phoneRegex = /^01[0-9]{8,9}$/;
      this.phoneMsg = !phoneRegex.test(this.form.phone);
    },
    //생년월일 체크
    validateBirth() {
      // 숫자 이외 제거
      this.form.birth = this.form.birth.replace(/\D/g, '');

      if(!this.form.birth) {
        this.birthMsg = false;
        return false;
      }

      // 형식: 8자리 숫자
      const birth = this.form.birth;
      if (!/^\d{8}$/.test(birth)) {
        this.birthMsg = true;
        return;
      }

      // 실제 날짜인지 확인
      const year = parseInt(birth.substring(0, 4));
      const month = parseInt(birth.substring(4, 6)) - 1; // JS는 0~11월
      const day = parseInt(birth.substring(6, 8));

      const date = new Date(year, month, day);

      // 날짜 유효성 체크
      const isValid =
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day;

      this.birthMsg = !isValid;
    },
    close() {
      this.$emit('close');
    },
    async submit() {
      // 간단한 유효성 체크
      if (!this.form.userId || !this.form.passwd || !this.form.passwdChk || !this.form.userNm || !this.form.nickNm || !this.form.email || !this.form.phone || !this.form.birth) {
        // alert('필수 항목을 입력하세요.');
        Swal.fire({
          icon: 'warning',
          text: '모든 항목을 입력해주세요.',
          confirmButtonColor: '#007bff',
          confirmButtonText: '확인',
        });
        return
      }

      const checkYn = await Swal.fire({
        title: '회원가입 하시겠습니까?',
        text: '입력한 정보로 회원가입을 진행합니다.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#aaa'
      });

      if(!checkYn.isConfirmed) {
        return;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #ffffff;
  padding: 30px 25px;
  width: 420px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.modal-content span.chkBtn {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.modal-content input {
  margin-top: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;
  height: 20px;
}

.modal-content input:focus {
  outline: none;
  border-color: #007bff;
}

.modal-content button {
  padding: 12px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s, transform 0.1s;
  height: 46px;
}

.modal-content button:first-of-type {
  background-color: #007bff;
  color: white;
  margin-top: 15px;
}

.modal-content button:first-of-type:hover {
  background-color: #0056b3;
}

.modal-content button:last-of-type {
  background-color: #f1f1f1;
  color: #333;
}

.modal-content button:last-of-type:hover {
  background-color: #e0e0e0;
}

.popup-enter-active, .popup-leave-active {
  transition: all 0.3s ease;
}
.popup-enter-from, .popup-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.popup-enter-to, .popup-leave-from {
  opacity: 1;
  transform: scale(1);
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-group input {
  flex: 1;
}

.input-group button {
  white-space: nowrap;
  padding: 12px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 15px;
}

.input-group button:hover {
  background-color: #5a6268;
}

.validationMsg {
  margin-left: 5px;
  color: red;
}
</style>