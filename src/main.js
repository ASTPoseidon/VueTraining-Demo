import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueRouter)

var router = new VueRouter({
    routes: [
        {
            path: '/TodoList',
            meta: {needau: true},
            component: () => import('./page/TodoList.vue')
        },
        {
            path: '/LoginView',
            meta: {needau: false},
            component:()=>import('./page/LoginView.vue')
        },
        {
            path: '/MainView',
            meta: {needau: false},
            component:()=>import('./page/MainView.vue')
        }
    ]
})


new Vue({
    render: h => h(App),

    router: router

}).$mount('#app')
