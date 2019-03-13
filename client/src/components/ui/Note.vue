<template>
	<v-card
		hover
	>
		<div>
			<v-card-title primary-title>
				<h2 class="note-title headline mb-1">{{ content.title }}</h2>
				<div class="notes-timestamp-container">
					<span class="grey--text ico-text"><v-icon class="ico-text-ico grey--text">mdi-calendar-clock</v-icon> {{ createdDate }}</span>
					<span class="grey--text ico-text"><v-icon class="ico-text-ico grey--text">mdi-calendar-edit</v-icon> {{ updateDate }}</span>
				</div>
			</v-card-title>
			<v-card-text>
				<p> {{ cutDescription }} </p>
			</v-card-text>
		</div>
		<v-card-actions>
			<v-btn flat icon color="secondary">
            	<v-icon>mdi-file-document-box-outline</v-icon>
            </v-btn>
			<v-btn flat icon color="primary">
				<v-icon>edit</v-icon>
			</v-btn>
            <v-btn flat icon color="error">
            	<v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		props: {
			content: Object
		},
		data() {
			return {
				maxDescriptionLength: 100
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
					description = description.substring(0, maxDescriptionLength - 3);
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
	.ico-text {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.ico-text-ico {
		font-size: 18px;
		margin-right: 5px;
	}
	.note-title{
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
</style>