import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    currentWeek: 0,
    currentDay: 1,
    info: []
  },

  mutations: {
    login(state) {
      state.logged = true
    },

    logout(state) {
      mpvue.clearStorage()
      state.logged = false
      state.info = []
    },

    setUserInfo(state, data) {
      state.info = data
    },

    setTodayInfo(state, data) {
      state.currentWeek = data.currentWeek
      state.currentDay = data.currentDay
      state.currentDate = data.currentDate
    }
  }
})

export default store
