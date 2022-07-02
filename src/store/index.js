
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      state.searchHistoryList.unshift(payload)
      state.searchHistoryList = [...new Set(state.searchHistoryList)]
    },
    deleteAllSearchHistoryList (state, payload) {
      state.searchHistoryList = payload
    },
    deleteSearchHistoryList (state, payload) {
      state.searchHistoryList.splice(payload, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
