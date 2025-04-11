<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const params = new URLSearchParams(window.location.search)
const code = params.get('code')

if (code) {
  router.push({ name: 'getToken', params: { code: code } })
}
</script>
<template>
  <main>In Callback</main>
</template>
