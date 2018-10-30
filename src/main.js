// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/custom.css'
import Error from './components/shared/Error'
import Stats from './components/shared/Stats'
import PostShow from './components/microposts/Show'
import Follow from './components/users/Follow'

Vue.component('Error', Error)
Vue.component('Stats', Stats)
Vue.component('PostShow', PostShow)
Vue.component('Follow', Follow)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
