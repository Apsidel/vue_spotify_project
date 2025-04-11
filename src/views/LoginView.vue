<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.login().then(() => {
    console.log('Login successful')
  })
})
</script>
<template>
  <main>Redirecting to Login...</main>
</template>
