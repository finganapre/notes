<template>
	<v-card
		hover
		class="notes-card"
	>
		<div>
			<v-card-title primary-title class="pb-0">
				<h2 class="note-title headline mb-2">{{ content.title }}</h2>
				<div class="notes-timestamp-container">
					<span class="grey--text ico-text"><v-icon class="ico-text-ico grey--text">mdi-calendar-clock</v-icon> {{ createdDate }}</span>
					<span class="grey--text ico-text"><v-icon class="ico-text-ico grey--text">mdi-calendar-edit</v-icon> {{ updateDate }}</span>
				</div>
			</v-card-title>
			<v-card-text class="note-text-container">
				<p class="note-text-container-text"> {{ cutDescription }} </p>
			</v-card-text>
		</div>
		<div>
			<v-divider></v-divider>
			<v-card-actions class="notes-action-container">
				<div class="notes-action-container-left">
					<v-layout row justify-center>
					      <v-dialog v-model="viewFullNote" max-width="800px">
					        <template v-slot:activator="{ on }">
					          <v-btn flat icon color="primary" v-on="on">
								<v-icon>mdi-file-document-box-outline</v-icon>
								</v-btn>
					        </template>
					        <v-card>
					          <v-card-title>
					            <span class="headline">{{content.title}}</span>
					          </v-card-title>
					          <v-card-text>{{ content.text }}</v-card-text>
					          <v-card-actions>
					            <v-spacer></v-spacer>
					            <v-btn color="green darken-1" flat="flat" @click="viewFullNote = false">Disagree</v-btn>
					            <v-btn color="green darken-1" flat="flat" @click="viewFullNote = false">Закрыть</v-btn>
					          </v-card-actions>
					        </v-card>
					      </v-dialog>
					    </v-layout>
					
					<v-btn flat icon color="secondary">
						<v-icon>mdi-pencil-outline</v-icon>
					</v-btn>
				</div>
				<div>
					<v-btn flat icon color="error">
						<v-icon>mdi-trash-can-outline</v-icon>
					</v-btn>
				</div>
				
			</v-card-actions>
		</div>
		
	</v-card>
</template>

<script>
	export default {
		props: {
			content: Object
		},
		data() {
			return {
				maxDescriptionLength: 200,
				viewFullNote: false
			}
			
		},
		computed: {
			createdDate(){
				let date = new Date(this.content.date_create);

				return `${timeConverter(date)}`;
			},
			updateDate(){
				let date = new Date(this.content.date_update);
				return `${timeConverter(date)}`
			},
			cutDescription(){
				let description = this.content.text;

				if ( description.length >= this.maxDescriptionLength){
					description = (description.substring(0, this.maxDescriptionLength - 3)).trim();
					description += '...';
				}

				return description;
			}
		}
	}

	function timeConverter(UNIXTimestamp){
	  let jsDate = new Date(UNIXTimestamp * 1000);

	  let months = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря'
	  ];

	  let year = jsDate.getFullYear();
	  let month = months[jsDate.getMonth()];
	  let date = jsDate.getDate();
	  let hour = jsDate.getHours();
	  let min = jsDate.getMinutes();
	  let sec = jsDate.getSeconds();
	  let time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;

	  return time;
	}
</script>

<style scoped>
	.notes-card {
		cursor: default;
	}
	.ico-text {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.ico-text-ico {
		font-size: 18px;
		margin-right: 5px;
	}
	.note-title {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.notes-timestamp-container {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}
	.note-text-container {

	}
	.note-text-container-text {
		margin: 0;
		padding: 0;
	}
	.notes-action-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.notes-action-container-left {
		display: flex;
		flex-direction: row;
		justify-content: start;
	}
</style>