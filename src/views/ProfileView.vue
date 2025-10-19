<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import TabContainer from '@/components/TabContainer.vue'
import TabItem from '@/components/TabItem.vue'
import UserProfileDisplay from '@/components/UserProfileDisplay.vue'
import TopTracksDisplay from '@/components/TopTracksDisplay.vue'

const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    authStore.login()
  }
})
</script>
<template>
  <main>
    <UserProfileDisplay />
    <TabContainer>
      <TabItem title="Short Term">
        <TopTracksDisplay time_range="short_term" />
      </TabItem>
      <TabItem title="Medium Term">
        <TopTracksDisplay time_range="medium_term" />
      </TabItem>
      <TabItem title="Long Term">
        <TopTracksDisplay time_range="long_term" />
      </TabItem>
    </TabContainer>
  </main>
</template>
