<script setup>
import { onMounted } from 'vue'
import { getAuth } from 'firebase/auth'

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (!code) {
    console.error('No code provided')
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

  getAuth().signInWithCustomToken(response.token)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error)
    })
})
</script>

<template>
  <div>
    <h1>Notion Callback</h1>
  </div>
</template>

<style scoped>

</style>
