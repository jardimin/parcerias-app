import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'
import Home from './views/Home.vue'
import Parceria from './views/Parceria.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/parceria/:id', component: Parceria },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes // short for routes: routes
})

const app = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

