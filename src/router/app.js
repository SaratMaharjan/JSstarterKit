import VueRouter from 'vue-router';
import App from '../views/App.vue';
import About from '../views/About.vue';

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
