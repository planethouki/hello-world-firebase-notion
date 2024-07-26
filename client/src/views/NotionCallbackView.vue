<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { useRouter } from 'vue-router'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const isLoading = ref(true)

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (!code) {
    console.error('No code provided')
    isLoading.value = false
    return
  }

  const response =  await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/notion/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    }
  ).then((res) => res.json())

  const auth = getAuth()
  signInWithCustomToken(auth, response.token)
    .then((userCredential) => {
      // const user = userCredential.user
      router.push('/home')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div>
    <h1>Now Login...</h1>
    <LoadingSpinner v-if="isLoading" />
  </div>
</template>

<style scoped>

</style>
