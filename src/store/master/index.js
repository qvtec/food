import axios from 'axios'

export default {
  namespaced: true,

  state: {
    categoryOptions: null,
    menuOptions: null
  },

  getters: {
    categoryOptions (state) {
      return state.categoryOptions
    },

    menuOptions (state) {
      return state.menuOptions
    }
  },

  mutations: {
    CATEGORY_OPTIONS (state, data) {
      state.categoryOptions = data
    },

    MENU_OPTIONS (state, data) {
      state.menuOptions = data
    }
  },

  actions: {
    async categoryOptions ({ commit }) {
      await axios.get('food/category-options')
        .then((response) => {
          commit('CATEGORY_OPTIONS', response.data)
        })
        .catch((error) => { throw error })
    },

    async menuOptions ({ commit }) {
      await axios.get('food/menu-options')
        .then((response) => {
          commit('MENU_OPTIONS', response.data)
        })
        .catch((error) => { throw error })
    }
  }
}
