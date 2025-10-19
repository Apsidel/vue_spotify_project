<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(async () => {
  if (authStore.isAuthenticated) {
    if (userStore.profile === null) {
      await userStore.fetchProfile(authStore.accessToken)
    }
  } else {
    authStore.login()
  }
})
</script>
<template>
  <div>
    <h1>{{ userStore.displayName }}</h1>
    <img
      v-if="userStore.profileImage"
      :src="userStore.profileImage"
      width="250px"
      alt="User Avatar"
    />
  </div>
</template>
