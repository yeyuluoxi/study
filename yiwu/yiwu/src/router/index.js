import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from "../views/center.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/index',
    component:()=>import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/',
    redirect:"/index"
  },
  {
    path:'/center',
    component:Center
  },
  {
    path:'/reg',
    component:()=>import(/* webpackChunkName: "reg" */ '../views/reg.vue')
  },
  {
    path:'/sign',
    component:()=>import(/* webpackChunkName: "sign" */ '../views/sign.vue')
  },
  {
    path:'/class',
    component:()=>import(/* webpackChunkName: "classify" */ '../views/classify.vue')
  },
  {
    path:'/details/:pid',
    component:()=>import(/* webpackChunkName: "detail" */ '../views/details.vue')
  },
  {
    path:'/shopcar',
    component:()=>import(/* webpackChunkName: "car" */ '../views/shopcar.vue')
  },
  {
    path:'/search',
    component:()=>import(/* webpackChunkName: "search" */ '../views/search.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to,from,savePosition){
    return {x:0,y:0}
  }
})

export default router
