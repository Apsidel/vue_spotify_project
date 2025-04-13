import api_auth from '@/api/auth'
import { defineStore } from 'pinia'

const clientId = "0675bf433fb946a9831b636e98f4fd81";

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    codeToken: "",
    expiresIn: "",
    verifier: "",
  }),

  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getCodeToken: (state) => state.codeToken,
    getVerifier: (state) => state.verifier,
    getExpiresIn: (state) => state.expiresIn
  },

  actions: {
    async setIsAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated
    },
    async setAccessToken(accessToken) {
      this.accessToken = accessToken
    },
    async setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken
    },
    async setCodeToken(codeToken) {
      this.codeToken = codeToken
    },
    async setVerifier(verifier) {
      this.verifier = verifier
    },
    async setExpiresIn(expiresIn) {
      this.expiresIn = expiresIn
    },

    async login() {
      try {
        await api_auth.redirectToAuthCodeFlow(clientId);

      } catch (error) {
        console.error('Error loging in:', error)
      }
    },

    async requestAccessToken(code) {
      try {
        const response = await api_auth.requestAccessToken(clientId, code);
        const { access_token, refresh_token, expires_in } = response;

        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        this.setExpiresIn(expires_in);
        this.setIsAuthenticated(true);

        console.log("Response:", response);
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
        console.log("Expires In:", expires_in);
      } catch (error) {
        console.error('Error getting access token:', error)
      }
    },

    async refreshAccessToken() {
      try {
        if (this.refreshToken) {
          const response = await api_auth.refreshToken(clientId, this.refreshToken)
          const { access_token, refresh_token, expires_in } = response;

          this.setAccessToken(access_token);
          this.setRefreshToken(refresh_token);
          this.setExpiresIn(expires_in);
          this.setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error refreshing access token:', error)
      }
    },

    async logout() {
      await api_auth.logout();
      this.store.$reset();
    }
  }
})