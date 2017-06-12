import VueRouter from 'vue-router';
import App from './views/app.vue';
import About from './views/about.vue';

const routes = [
	{
		path: '/',
		component: App
	},
	{
		path: '/about',
		component: About
	}
];

export default new VueRouter({
	routes,
	linkActiveClass: 'is-active'
});
