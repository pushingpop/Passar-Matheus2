import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import referencia from '@/components/referencia'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'referencia',
      component: referencia
    }
  ]
})
