<!-- PageHeader.vue -->
<template>
  <footer>
    Header
    <div>
      <button @click="logout" >로그아웃</button>
    </div>
  </footer>
  <hr/>
</template>

<script>

import router from "@/router";

export default {
  name: 'Header',
  data() {
    return {
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>