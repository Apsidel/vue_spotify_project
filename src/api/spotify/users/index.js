import request from "../request";

export default {
    fetchProfile: async function (token) {
        const response = await request.get("me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    },

    fetchTopTracks: async function (token, time_range = "short_term") {
        const params = new URLSearchParams();
        params.append("limit", 20);
        params.append("time_range", time_range);
        params.append("offset", 0);

        const response = await request.get(`me/top/tracks?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    },

    fetchTopArtists: async function (token, time_range = "short_term") {
        const params = new URLSearchParams();
        params.append("limit", 20);
        params.append("time_range", time_range);
        params.append("offset", 0);

        const response = await request.get(`me/top/artists?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    },

    createPlaylist: async function (token, userId, name = "My Top Tracks Playlist", description = "", isPublic = false) {
        const response = await request.post(`users/${userId}/playlists`, {
            name: name,
            description: description,
            public: isPublic
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.data;
    },

    addTracksToPlaylist: async function (token, playlistId, trackUris) {
        const response = await request.post(`playlists/${playlistId}/tracks`, {
            uris: trackUris
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.data;
    }
}