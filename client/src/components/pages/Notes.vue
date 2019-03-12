<template>
	<v-container>
		<v-layout align-stretch justify-start row wrap class="notes-container">
			<v-flex xs12 sm6 md4 lg3 xl2 v-for="note in notes" :key="note.id">
				<Note
					class="notes-item"
					:content="note"
				></Note>
			</v-flex>
		</v-layout>

		<v-btn
			color="accent"
			dark
			fab
			fixed
			bottom
			right
			to="new-note"
		>
			<v-icon>add</v-icon>
		</v-btn>
	</v-container>
</template>

<script>
	import api from '@/services/api'
	import Note from '@/components/ui/Note'

	export default {
		props: {
			notes: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
		
		},
		components: {
			Note: Note
		}
	}
</script>

<style scoped>
	.notes-container{
		margin: -15px;
	}
	.notes-item {
		margin: 15px;
	}
</style>