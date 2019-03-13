<template>
	<v-container>
		<v-layout align-stretch justify-start row wrap class="notes-container">
			<v-flex class="notes-item" xs12 sm6 md4 lg3 xl2 v-for="note in updateDateSort" :key="note.id">
				<Note
					class="notes-item-card"
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
		computed: {
			updateDateSort(){
				let arr = this.notes;

				arr.sort(function(a, b){
					return (a.date_update - b.date_update) * -1;
				});

				return arr;
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
		padding: 15px;
	}
	.notes-item-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
</style>