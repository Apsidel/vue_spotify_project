<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const userStore = useUserStore()

const props = defineProps({
  time_range: {
    type: String,
    required: true,
  },
})

const { getTopTracksByTimeRange } = storeToRefs(userStore)
const { getTopArtistsByTimeRange } = storeToRefs(userStore)

const topTracks = ref([])
const topArtists = ref([])

onMounted(async () => {
  if (authStore.isAuthenticated) {
    topTracks.value = getTopTracksByTimeRange.value(props.time_range)

    if (topTracks.value.length === 0) {
      await userStore.fetchTopTracks(authStore.accessToken, props.time_range)
      topTracks.value = getTopTracksByTimeRange.value(props.time_range)
    }

    topArtists.value = getTopArtistsByTimeRange.value(props.time_range)

    if (topArtists.value.length === 0) {
      await userStore.fetchTopArtists(authStore.accessToken, props.time_range)
      topArtists.value = getTopArtistsByTimeRange.value(props.time_range)
    }
  } else {
    authStore.login()
  }
})
</script>
<template>
  <h2>Top Tracks</h2>
  <ul>
    <li v-for="(track, index) in topTracks" :key="track.id">
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
    <li v-for="(artist, index) in topArtists" :key="artist.id">
      {{ index + 1 }}
      <img :src="artist.images[0].url" width="100px" alt="Artist Avatar" />
      {{ artist.name }}
    </li>
  </ul>
</template>
