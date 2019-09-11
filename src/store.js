import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    logged: false,
    currentWeek: 0,
    currentDay: 1
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
    login: (state) => {
      const obj = state
      obj.logged = true
    },
    setTodayInfo: (state, data) => {
      const obj = state
      obj.currentWeek = data.currentWeek
      obj.currentDay = data.currentDay
      obj.currentDate = data.currentDate
    }
  }
})

export default store
