<template>
	<v-app id="app">

		<MainNavDrawer
			:mainNavbarDrawer = "mainNavbarDrawer"
			:notes = "notes"
			@changeMainNavState = "onChangeMainNavState"
		></MainNavDrawer>


		<MainToolbar
			:appName = appName
			@openCloseMainNav = "openCloseMainNav"
			@reloadPage = "reloadPage"
			@prePage = "prePage"
			@nextPage = "nextPage"
		></MainToolbar>


		<v-content>
			<transition appear name="page" mode="out-in">
				<router-view :notes="notes" @prePage="prePage" @addNote="addNote"></router-view>
			</transition>
		</v-content>


	</v-app>
</template>

<script>
	import api from '@/services/api'
	import MainToolbar from '@/components/ui/MainToolbar'
	import MainNavDrawer from '@/components/ui/MainNavDrawer'

	export default {
		name: 'App',
		data(){
			return {
				appName: 'Мои заметки',
				mainNavbarDrawer: null,
				notes: [
					{
						id: '1',
						title: 'Заголовок 1',
						text: 'Текст для заметки 1',
						createDate: 1513759529,
						updateDate: 1513759529
					},
					{
						id: '2',
						title: 'Заголовок 2',
						text: 'Текст для заметки 2',
						createDate: 1513759529,
						updateDate: 1513759529
					},
					{
						id: '3',
						title: 'Заголовок 3',
						text: 'Текст для заметки 3',
						createDate: 1513759529,
						updateDate: 1513759529
					},
					{
						id: '4',
						title: 'Заголовок 4',
						text: 'Текст для заметки 4',
						createDate: 1513759529,
						updateDate: 1513759529
					}
				]
			}
		},
		methods: {
			openCloseMainNav() {
				this.mainNavbarDrawer = !(this.mainNavbarDrawer);
			},
			onChangeMainNavState(state) {
				this.mainNavbarDrawer = state;
			},
			reloadPage() {
				document.location.reload(true);
			},
			prePage() {
				this.$router.go(-1);
			},
			nextPage() {
				this.$router.go(1);
			},

			// ---------- API ---------- //
			// getAllNotes
			getAllNotes() {
				api().get('/notes')
					.then(response => {
						this.notes = response.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			// addNote
			addNote(formData) {
				let data = formData;
				console.log(data);
				api().post('/notes', data)
				.then(response => {
					console.log(response);
				})
				.catch(err => {
					console.log(err);
				});
			}
		},
		created(){
			this.getAllNotes();
		},
		mounted(){
			this.getAllNotes();
		},
		components: {
			MainNavDrawer: MainNavDrawer,
			MainToolbar: MainToolbar
		}
	}
</script>

<style>
	/*  router animation */
	.page-enter-active, .page-leave-active {
		transition: opacity 0.3s;
	}
	.page-enter, .page-leave-to {
		opacity: 0;
		/*transform: translateX(-30%);*/
	}
</style>