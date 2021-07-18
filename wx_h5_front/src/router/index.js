import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const routes = [{
    path:'/index',
    name:'Index',
    component:() => import('../pages/index.vue')
},{
    path: '/test',
    name:'Test',
    component: ()=> import('../pages/test.vue')
}]

const router = new Router({
    routes
})

export default router