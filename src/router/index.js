import Vue from 'vue'
import Router from 'vue-router'
import Home from '@C/Home'
import MusicalWork from '@C/pages/MusicalWork'
import Concert from '@C/pages/Concert'
import DramaWork from '@C/pages/DramaWork'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', //若未設定 path
      redirect: '/' // 導向
    },
    {
      // 默認路由
      path: '/', 
      redirect: 'musicalWork'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'musicalWork',
          name: 'MusicalWork',
          component: MusicalWork,
        },
        {
          path: 'concert',
          name: 'Concert',
          component: Concert,
        },
        {
          path: 'dramaWork',
          name: 'DramaWork',
          component: DramaWork,
        }
      ]
    }
  ]
})
