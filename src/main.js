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
import '@/styles/base.css'
import '@/styles/index.css'

// 全局图标组件
import TI from '@/components/Hmicon.vue'

// 引入过滤器
import * as obj from '@/filters'
Vue.component('TI', TI)

Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
