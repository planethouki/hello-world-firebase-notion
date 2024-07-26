<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

const isLoggedIn = ref(false)
const auth = getAuth()
auth.onAuthStateChanged(user => {
  isLoggedIn.value = !!user
})
</script>

<template>
  <template v-if="isLoggedIn">
    <Header />
  </template>

  <RouterView />
</template>

<style scoped>

</style>
