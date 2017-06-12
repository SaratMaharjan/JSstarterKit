// import Axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routes';
// import App from './views/app.vue';

Vue.use(VueRouter);

const sharedData = {
	message: 'this is shared message'
};

/*
	Vue.component('coupon', {
		props: ['code'],

		template: `<input type="text" :value="code"
								@input="updateCode($event.target.value)"
								ref="input">`,

		methods: {
			updateCode(code) {
				if (code === 'ALLFREE') {
					alert('not valid anymore');
					this.$refs.input.value = code = '';
				}
				this.$emit('input', code);
			}
		}
	})
*/

new Vue({
	el: '#app',

	// render: h => h(App),

	router,

	data() {
		return {
			message: sharedData.message,
			coupon: 'FREEEEEE'
		};
	},

	mounted() {

	}
});
