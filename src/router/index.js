import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/Login.vue'
// import FirstPage from '../view/FirstPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/FirstPage',
      name: 'FirstPage',
      // component: FirstPage
      component: () => import('../view/FirstPage'),
      children: [
        {
          path: '/Info',
          name: 'Info',
          component: () => import('../components/staff/Info')
        },
        {
          path: '/Salary',
          name: 'Salary',
          component: () => import('../components/staff/Salary')
        }
      ]

    }
  ]
})
