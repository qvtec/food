import axios from 'axios'
import { LocalStorage } from 'quasar'

export default {
  namespaced: true,

  state: {
    user: null,
    token: LocalStorage.getItem('token') || null
  },

  getters: {
    user (state) {
      return state.user
    },

    isAuthenticated (state) {
      return state.token !== null
    }
  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
    },

    RESET_USER (state) {
      state.user = null
    },

    SET_TOKEN (state, token) {
      state.token = token
    },

    RESET_TOKEN (state) {
      state.token = null
    }
  },

  actions: {
    async login ({ commit }, creds) {
      await axios.post('login', creds)
        .then((response) => {
          const token = response.data.token
          commit('SET_TOKEN', token)
          commit('RESET_USER')
          LocalStorage.set('token', token)
          axios.defaults.headers.common.Authorization = 'Bearer ' + token
        })
        .catch((error) => {
          LocalStorage.remove('token')
          throw error
        })
    },

    async logout ({ commit }) {
      await axios.post('logout')
        .then((response) => {
          // console.log(response)
          localStorage.removeItem('token')
          commit('RESET_TOKEN')
          commit('RESET_USER')
        })
        .catch((error) => {
          // console.log(error)
          throw error
        })
    },

    async setUser ({ commit }, payload) {
      await axios.post('user')
        .then((response) => {
          // console.log(response)
          commit('SET_USER', response.data)
        })
        .catch((error) => {
          // console.log(error)
          throw error
        })
    }
  }
}
