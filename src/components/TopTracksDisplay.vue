<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const userStore = useUserStore()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
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
      topTracks.value = await userStore.fetchTopTracks(authStore.accessToken, props.time_range)
    }

    topArtists.value = getTopArtistsByTimeRange.value(props.time_range)

    if (topArtists.value.length === 0) {
      topArtists.value = await userStore.fetchTopArtists(authStore.accessToken, props.time_range)
    }
  } else {
    authStore.login()
  }
})

function formatTimeRange(timeRange) {
  switch (timeRange) {
    case 'long_term':
      return 'year'
    case 'medium_term':
      return '6 months'
    case 'short_term':
    default:
      return '4 weeks'
  }
}

function getPlaylistDescription(timeRange) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const date = new Date().toLocaleDateString('en-US', options)
  return `Your top songs in the last ${timeRange}. Created on ${date}.`
}

async function createTopPlaylist() {
  const playlistId = await userStore.createPlaylist(
    authStore.accessToken,
    `My Top Tracks (${props.title})`,
    getPlaylistDescription(formatTimeRange(props.time_range)),
    false,
  )
  const topTracksUri = topTracks.value.map((song) => song.uri)
  await userStore.addTracksToPlaylist(authStore.accessToken, playlistId, topTracksUri)
}
</script>
<template>
  <div @click="createTopPlaylist()">Create Playlist</div>
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
