<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

const isLoggedIn = ref(false)
const userId = ref(null)
const auth = getAuth()

auth.onAuthStateChanged(user => {
  isLoggedIn.value = !!user
  userId.value = user ? user.uid : null
})
</script>

<template>
  <template v-if="isLoggedIn">
    <Header :userId="userId" />
  </template>

  <RouterView />
</template>

<style scoped>

</style>
