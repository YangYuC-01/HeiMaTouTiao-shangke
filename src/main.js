import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.less'
// import 'vant/lib/index.css'
import 'amfe-flexible'

import '@/styles/icon.less'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
