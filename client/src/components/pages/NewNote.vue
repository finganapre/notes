<template>
	<v-container>
		<AddForm @save="addNote" @prePage="prePage">
		</AddForm>
	</v-container>
</template>

<script>
	import api from '@/services/api'
	import NewNoteForm from '@/components/ui/NewNoteForm'

	export default {
		data() {
			return {
				title: String,
				text: String
			}
		},
		components: {
			AddForm: NewNoteForm
		},
		methods: {
			addNote: function(formData){
				this.$emit('addNote', formData);
			},

			prePage: function() {
				this.$emit('prePage');
			}
		},

	}
</script>

<style scoped>
	
</style>