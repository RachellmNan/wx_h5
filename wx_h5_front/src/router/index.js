import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const routes = [{
    path:'/index',
    name:'Index',
    component:() => import('../pages/index.vue')
}]

const router = new Router({
    routes
})

export default router