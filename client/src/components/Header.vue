<script setup>
import { RouterLink, useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { toRefs } from 'vue';

const props = defineProps({
  userId: {
    type: String,
    required: false
  }
});

const { userId } = toRefs(props);
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
        <div class="nav-right">
          <div v-if="userId" class="user-id">User ID: {{ userId }}</div>
          <button @click="handleLogout">Logout</button>
        </div>
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

.nav-right {
  margin-left: auto;
  text-align: right;
}

.user-id {
  text-align: right;
  font-weight: bold;
}
</style>
