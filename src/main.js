import Vue from 'vue'
import App from './App.vue'

import socket from './config/ws/index'
Vue.prototype.$socket = socket

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
