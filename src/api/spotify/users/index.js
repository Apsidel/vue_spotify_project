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
}