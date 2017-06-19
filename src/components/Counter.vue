<template>
	<div class="counter" :style="{ backgroundColor: `hsl(${Math.max(50, x%120)}, 80%, 50%)` }" @mousemove="xCoordinate">
		<p>The Count: {{ count }}</p>

		<p>Pixels across: {{ x }}</p>

		<p>
			<button class="btn-primary" @click="count += 1">Increment</button>
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				x: 0
			}
		},

		methods: {
			xCoordinate(e) {
				this.x = e.clientX;
			}
		}
	}
</script>

<style scoped>
.counter {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	align-content: center;
  width: 100%;
  height: 5em;
	margin: auto;
	padding: 2px;
}
</style>
