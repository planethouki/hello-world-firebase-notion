<script setup>
const clientId = import.meta.env.VITE_NOTION_CLIENT_ID
const redirectUri = import.meta.env.VITE_NOTION_REDIRECT_URI
const loginUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(redirectUri)}`
</script>

<template>
  <main>
    <section>
      <h1>Login</h1>
      <a :href="loginUrl">
        Login with Notion
      </a>
    </section>
  </main>
</template>
