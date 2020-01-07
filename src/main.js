import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

Vue.config.productionTip = false


const socket = io('https://smapi.gorymoon.se/v2', {
    autoConnect: false
})
Vue.use(VueSocketIOExt, socket)
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
}).$mount('#app')
