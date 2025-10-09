<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await userStore.fetchProfile(authStore.accessToken)
    await userStore.fetchTopTracks(authStore.accessToken)
    await userStore.fetchTopArtists(authStore.accessToken)
  } else {
    authStore.login()
  }
})
</script>
<template>
  <main>
    <h1>{{ userStore.displayName }}</h1>
    <img
      v-if="userStore.profileImage"
      :src="userStore.profileImage"
      width="250px"
      alt="User Avatar"
    />
    <h2>Top Tracks</h2>
    <ul>
      <li v-for="(track, index) in userStore.topTracks" :key="track.id">
        {{ index + 1 }}
        <img :src="track.album.images[0].url" width="100px" alt="Album Cover" />
        {{ track.name }} by
        {{
          track.artists
            .map((artist) => artist.name)
            .join(', ')
            .toString()
        }}
      </li>
    </ul>

    <h2>Top Artists</h2>
    <ul>
      <li v-for="(artist, index) in userStore.topArtists" :key="artist.id">
        {{ index + 1 }}
        <img :src="artist.images[0].url" width="100px" alt="Artist Avatar" />
        {{ artist.name }}
      </li>
    </ul>
  </main>
</template>
