<template>
	<div class="counter" :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }" @mousemove="xCoordinate">
		<h2>The Count: {{ count }} </h2>
		<p>Pixels across: {{ x }}</p>
		<p>
			<button @click="count += 1">Increment</button>
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

<style>
.counter {
  width: 100%;
  /*height: 100vh;*/
  font-size: 30px;
  transition: 0.2s background-color ease;
}
</style>
