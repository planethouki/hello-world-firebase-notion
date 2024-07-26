<script setup>
import { RouterLink, useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    await signOut(auth);
    await router.push('/')
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button @click="handleLogout" class="logout-button">Logout</button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  margin-left: auto;
}
</style>
