import generators from "./generators.js";
import request from "./request";

const redirect_uri = "http://127.0.0.1:5173/callback";

export default {
    redirectToAuthCodeFlow: async function (clientId) {
        const verifier = generators.generateCodeVerifier();
        const challenge = await generators.generateCodeChallenge(verifier);

        localStorage.setItem("code_verifier", verifier);
        console.log("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", 'code');
        params.append("redirect_uri", redirect_uri);
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", 'S256');
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    },

    requestAccessToken: async function (clientId, code) {
        const verifier = localStorage.getItem("code_verifier");

        const response = await request.post("token", {
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirect_uri,
            code_verifier: verifier
        }, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data;
    },

    refreshToken: async function (clientId, refreshToken) {
        const response = await request.post("token", {
            client_id: clientId,
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data;
    },

    logout: async function () {
        let script = document.createElement("script");

        script.src = "https://www.spotify.com/logout/";
        document.getElementById("app").appendChild(script);

        window.localStorage.clear();
        window.sessionStorage.clear();

        setTimeout(() => {
            location.reload();
        }, 1000);
    }
};