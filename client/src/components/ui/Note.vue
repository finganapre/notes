<template>
	<v-card>
		<div>
			<v-card-title primary-title>
				<h2 class="headline mb-0">{{ content.title }}</h2>
				<span class="grey--text">Создано: {{ createdDate }}</span><br>
				<span class="grey--text">Обновлено: {{ updateDate }}</span>
			</v-card-title>
			<v-card-text>
				<div> {{ content.text }} </div>
			</v-card-text>
		</div>
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
		},
		computed: {
			createdDate(){
				let date = new Date(this.content.date_create);

				return `${timeConverter(date)}`;
			},
			updateDate(){
				let date = new Date(this.content.date_update);
				return `${timeConverter(date)}`
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
	
</style>