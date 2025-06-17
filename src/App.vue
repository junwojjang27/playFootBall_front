<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <PageHeader v-if="!isAuthPage"/>
  <router-view />
  <PageFooter v-if="!isAuthPage"/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import '@/assets/styles/common.css'

export default {
  name: 'App',
  components: {
    // HelloWorld
    PageFooter,
    PageHeader
  },
  setup() {
    const route = useRoute()

    // 로그인/회원가입 페이지일 때는 헤더/푸터 숨김
    const isAuthPage = computed(() => ['/login'].includes(route.path))

    return { isAuthPage }
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
