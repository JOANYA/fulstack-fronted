import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import ProductList from '@/views/ProductList.vue';
import ProductForm from '@/views/ProductForm.vue';
import CategoryList from '@/views/CategoryList.vue';

const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/products', name: 'Products', component: ProductList },
    { path: '/products/new', name: 'ProductForm', component: ProductForm },
    { path: '/categories', name: 'Categories', component: CategoryList }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;