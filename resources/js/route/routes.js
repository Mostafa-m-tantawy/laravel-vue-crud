import Vue from 'vue'
import VueRouter from 'vue-router'

// mengaktifkan vue router
Vue.use(VueRouter);

import dashboard from '../pages/dashboard.vue'
// kelas
import index_kelas from '../pages/category/index.vue'
import create_kelas from '../pages/category/create.vue'
import edit_kelas from '../pages/category/edit.vue'
// siswa
import index_siswa from '../pages/products/index.vue'
import create_siswa from '../pages/products/create.vue'
import edit_siswa from '../pages/products/edit.vue'

const routes = [

    {
        name: 'products',
        path: '/products',
        meta: 'Products',
        component: index_siswa,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta //sebelum masuk ubah title + meta di route
            next() // lanjutkan
        },
    },
    {
        name: 'create_products',
        path: '/products/create',
        meta: 'Create product',
        component: create_siswa,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'edit_products',
        path: '/products/:id',
        meta: 'Edit product',
        component: edit_siswa,
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
        component: index_kelas,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'create_kelas',
        path: '/categories/create',
        meta: 'Create categories',
        component: create_kelas,
        beforeEnter: (to, from, next) => {
            document.title = "vue - " + to.meta
            next()
        },
    },
    {
        name: 'edit_categories',
        path: '/categories/:id',
        meta: 'Edit categories',
        component: edit_kelas,
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
