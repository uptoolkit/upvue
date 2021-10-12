import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import App from './pages/App.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import auth from '../lib/middlewares/auth';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/app',
        component: App,
        beforeEnter: auth
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export {
    routes
}

export default router;