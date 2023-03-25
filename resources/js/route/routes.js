import Vue from 'vue'
import VueRouter from 'vue-router'

// mengaktifkan vue router
Vue.use(VueRouter);

import dashboard from '../pages/dashboard.vue'
// kelas
import index_category from '../pages/category/index.vue'
import create_category from '../pages/category/create.vue'
import edit_category from '../pages/category/edit.vue'
// siswa
import index_products from '../pages/products/index.vue'
import create_products from '../pages/products/create.vue'
import edit_products from '../pages/products/edit.vue'

const routes = [

    {
        name: 'products',
        path: '/products',
        meta: 'Products',
        component: index_products,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta //sebelum masuk ubah title + meta di route
            next() // lanjutkan
        },
    },
    {
        name: 'create_products',
        path: '/products/create',
        meta: 'Create product',
        component: create_products,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'edit_products',
        path: '/products/:id',
        meta: 'Edit product',
        component: edit_products,
        props: true,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'categories',
        path: '/categories',
        meta: 'categories',
        component: index_category,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'create_kelas',
        path: '/categories/create',
        meta: 'Create categories',
        component: create_category,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'edit_categories',
        path: '/categories/:id',
        meta: 'Edit categories',
        component: edit_category,
        props: true,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'dashboard',
        path: '*',
        meta: 'Dashboard',
        component: dashboard,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        }
    },
]

const router = new VueRouter({
    LinkaAtiveClass: 'active',
    mode: 'history',
    routes
})


export default router
