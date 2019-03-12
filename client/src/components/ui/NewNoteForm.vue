<template>
	<v-form @submit.prevent="save">
		<v-container d-flex justify-center>
			<v-layout flex xs12 sm12 md8 lg8 xl6 column>
				<v-flex>
					<v-text-field
						v-model="formData.title"
						label="Заголовок"
						required
						autofocus
					></v-text-field>
				</v-flex>
				<v-flex

				>
					<v-textarea
			            solo
			            v-model="formData.text"
			            label="Введите текст заметки..."
			            auto-grow
			            hide-details
			         ></v-textarea>
				</v-flex>
				<v-flex justify-end>
					<v-btn
						color="success"
						type="submit"
					>Сохранить</v-btn>
					<v-btn
						color="error"
						type="button"
						@click.prevent="abort"
					>Отмена</v-btn>
				</v-flex>
			</v-layout>
		</v-container>
	</v-form>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					title: '',
					text: ''
				}
			}
		},
		methods: {
			save: function(){
				this.$emit('save', this.formData);
			},
			abort: function(){
				/*this.formData.text = '';
				this.formData.title = '';*/

				this.$emit('prePage');
			}
		}
	}
</script>

<style scoped>
	
</style>