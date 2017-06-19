<template>

	<div class="message">
		<p>
			<slot></slot>
		</p>
	</div>

</template>

<script>
	export default {

	}
</script>

<style scoped>
	.card {
		display: flex;
		flex-direction: row;
		border: 1px solid;
		background-color: #abcdef;
		margin: 1px;
		padding: 1px;
	}
</style>
