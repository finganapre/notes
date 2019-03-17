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
				notes: []
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
						this.notes = response.data.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			// addNote
			addNote(formData) {
				let data = formData;

				api().post('/notes', data)
				.then(response => {
					console.log(response);
				})
				.catch(err => {
					console.log(err);
				});
			},

			// getNoteById
			getNote(formData) {
				api().get(`/notes/${formData.id}`, formData)
				.then(response => {
					console.log(response);
				})
				.catch(err => {
					console.log(err);
				});
			},

			// updateNote
			updateNote(formData) {
				let data = formData;
				api()
					.put('/notes', {
						data: formData,
						query: {
							id: formData.id
						}
					})
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
	html, body {
		min-width: 303px;
	}
	/*  router animation */
	.page-enter-active, .page-leave-active {
		transition: opacity 0.3s;
	}
	.page-enter, .page-leave-to {
		opacity: 0;
		/*transform: translateX(-30%);*/
	}
</style>