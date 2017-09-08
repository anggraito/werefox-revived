import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
// import Room from '@/components/room'
import Hello from '@/components/Hello'
import Room from '@/components/background'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Hello
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/room/:id',
      component: Room,
      props: true
    }
  ]
})
