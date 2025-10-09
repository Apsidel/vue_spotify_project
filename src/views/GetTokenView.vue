<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await authStore.requestAccessToken(props.code)

  if (authStore.isAuthenticated) {
    router.push({ name: 'profile' })
  }
})
</script>
<template>
  <main>Retrieving Token...</main>
</template>
