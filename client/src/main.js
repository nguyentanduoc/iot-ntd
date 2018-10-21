// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from '@/store'
import VueMqtt from 'vue-mqtt'
Vue.use(BootstrapVue)
import VueMoment from 'vue-moment'
Vue.use(VueMoment)

//connect Mqtt broker
var options = {
  clientId: 'WebClient-' + parseInt(Math.random() * 100000),
  username: 'zddelmko',
  password: 'NQ-HVjwgF3v1'
};
Vue.use(VueMqtt, 'wss://m10.cloudmqtt.com:38332', options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
