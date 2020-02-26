import Vue from 'vue'
import App from './App'
import store from './store'

import '@/styles/iconfont/iconfont.css'
import '@/styles/common.scss'
import '@/styles/style.scss'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
