import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueRouter)

var router = new VueRouter({
    routes: [
        {
            path: '/',
            meta: {Au: false},
            component: () => import('./page/LoginView.vue')
        },
        {
            path: '/MainView',
            meta: {Au: true},
            component: () => import('./page/MainView.vue')
        }
    ]
})


new Vue({
    render: h => h(App),

    router: router

}).$mount('#app')
