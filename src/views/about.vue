<template>
	<div id="about">
		<counter></counter>
	</div>
</template>

<script>
import Counter from '../components/Counter.vue';
export default {
	name: 'about',
	components: { Counter },
	data() {
		return {
			message: 'message for about page'
		}
	}
}
</script>

<style scoped>

</style>
