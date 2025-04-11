import axios from "axios";

const baseURL = "https://accounts.spotify.com/api/";

const request = axios.create({
    baseURL
});

export default request;