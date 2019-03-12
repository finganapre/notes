<template>
	<v-card>
		<v-card-title primary-title>
			<h2 class="headline mb-0">{{ content.title }}</h2>
			<div> {{ content.text }} </div>
		</v-card-title>
		<v-card-actions>
			<v-btn flat color="primary" ico circle>
				<v-icon circle>edit</v-icon circle>
			</v-btn>
            <v-btn flat color="secondary" ico>
            	<v-icon circle>trash</v-icon circle>
            </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		props: {
			content: Object
		}
	}
</script>

<style scoped>
	
</style>