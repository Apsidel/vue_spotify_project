import api_user from '@/api/spotify/users'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        profile: null,
        profileImage: '',
        displayName: '',
        userId: '',

        topTracksShortTerm: [],
        topTracksMediumTerm: [],
        topTracksLongTerm: [],

        topArtistsShortTerm: [],
        topArtistsMediumTerm: [],
        topArtistsLongTerm: [],

        playlists: [],
    }),

    getters: {
        getTopTracksByTimeRange: (state) => {
            return (time_range) => {
                if (time_range === "short_term") {
                    return state.topTracksShortTerm
                } else if (time_range === "medium_term") {
                    return state.topTracksMediumTerm
                } else if (time_range === "long_term") {
                    return state.topTracksLongTerm
                } else {
                    return state.topTracksShortTerm
                }
            }
        },
        getTopArtistsByTimeRange: (state) => {
            return (time_range) => {
                if (time_range === "short_term") {
                    return state.topArtistsShortTerm
                } else if (time_range === "medium_term") {
                    return state.topArtistsMediumTerm
                } else if (time_range === "long_term") {
                    return state.topArtistsLongTerm
                } else {
                    return state.topArtistsShortTerm
                }
            }
        }
    },

    actions: {
        async fetchProfile(token) {
            try {
                const response = await api_user.fetchProfile(token)

                this.profileImage = response.images[0].url
                this.displayName = response.display_name
                this.userId = response.id
                this.profile = response

                console.log("User Profile:", this.profile)
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        },

        async fetchTopTracks(token, time_range = "short_term") {
            var topTracks = []
            try {
                const response = await api_user.fetchTopTracks(token, time_range)
                this.setTopTracksByTimeRange(time_range, response.items)
                topTracks = response.items
                console.log("Top Tracks:", response.items)
            } catch (error) {
                console.error('Error fetching top tracks:', error)
            }
            return topTracks
        },

        async fetchTopArtists(token, time_range = "short_term") {
            var topArtists = []
            try {
                const response = await api_user.fetchTopArtists(token, time_range)
                this.setTopArtistsByTimeRange(time_range, response.items)
                topArtists = response.items
                console.log("Top Artists:", response.items)
            } catch (error) {
                console.error('Error fetching top tracks:', error)
            }
            return topArtists
        },

        async createPlaylist(token, name, description, isPublic) {
            var playlist_id = ''
            try {
                const response = await api_user.createPlaylist(token, this.userId, name, description, isPublic)
                playlist_id = response.id
                console.log("Created Playlist:", response)
            } catch (error) {
                console.error('Error creating playlist:', error)
            }
            return playlist_id
        },

        async addTracksToPlaylist(token, playlistId, trackUris) {
            try {
                const response = await api_user.addTracksToPlaylist(token, playlistId, trackUris)
                console.log("Added Tracks to Playlist:", response)
            } catch (error) {
                console.error('Error adding tracks to playlist:', error)
            }
        },

        setTopTracksByTimeRange(time_range, items) {
            if (time_range === "short_term") {
                this.topTracksShortTerm = items
            } else if (time_range === "medium_term") {
                this.topTracksMediumTerm = items
            } else if (time_range === "long_term") {
                this.topTracksLongTerm = items
            }
        },

        setTopArtistsByTimeRange(time_range, items) {
            if (time_range === "short_term") {
                this.topArtistsShortTerm = items
            } else if (time_range === "medium_term") {
                this.topArtistsMediumTerm = items
            } else if (time_range === "long_term") {
                this.topArtistsLongTerm = items
            }
        }
    }
})