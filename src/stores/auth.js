import api_auth from '@/api/auth'
import { defineStore } from 'pinia'

const clientId = "0675bf433fb946a9831b636e98f4fd81";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    codeToken: "",
    expiresIn: "",
  }),

  getters: {
  },

  actions: {
    setIsAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken
    },
    setCodeToken(codeToken) {
      this.codeToken = codeToken
    },
    setExpiresIn(expiresIn) {
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

          console.log("Refreshed Access Token:", response);
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