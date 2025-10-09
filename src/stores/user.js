import api_user from '@/api/spotify/users'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        profile: '',
        profileImage: '',
        displayName: '',
        topTracks: [],
        topArtists: [],
        playlists: [],
    }),

    getters: {
    },

    actions: {
        async fetchProfile(token) {
            try {
                const response = await api_user.fetchProfile(token)

                this.profileImage = response.images[0].url
                this.displayName = response.display_name
                this.profile = response

                console.log("User Profile:", response)
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        },

        async fetchTopTracks(token) {
            try {
                const response = await api_user.fetchTopTracks(token)
                this.topTracks = response.items
                console.log("Top Tracks:", response.items)
            } catch (error) {
                console.error('Error fetching top tracks:', error)
            }
        },

        async fetchTopArtists(token) {
            try {
                const response = await api_user.fetchTopArtists(token)
                this.topArtists = response.items
                console.log("Top Artists:", response.items)
            } catch (error) {
                console.error('Error fetching top tracks:', error)
            }
        }
    }
})