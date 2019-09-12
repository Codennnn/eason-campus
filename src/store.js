import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    logged: true,
    currentWeek: 0,
    currentDay: 1,
    info: []
  },

  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },

    login (state) {
      state.logged = true
    },

    logout (state) {
      state.logged = false
      state.info = []
    },

    setUserInfo (state, data) {
      state.info = data
    },

    setTodayInfo (state, data) {
      state.currentWeek = data.currentWeek
      state.currentDay = data.currentDay
      state.currentDate = data.currentDate
    }
  }
})

export default store
