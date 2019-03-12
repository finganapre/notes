<template>
	<v-toolbar
		dark
		color="primary"
		fixed
		clipped-left
		app
		dense
		:extended='toolbarTabs'
		tabs
	>
		<v-toolbar-side-icon @click="$emit('openCloseMainNav')"><v-icon>menu</v-icon></v-toolbar-side-icon>

		<v-toolbar-title class="white--text">{{appName}}</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn
			icon
			@click="$emit('prePage')"
		>
			<v-icon>chevron_left</v-icon>
		</v-btn>

		<v-btn
			icon
			@click="$emit('nextPage')"
		>
			<v-icon>chevron_right</v-icon>
		</v-btn>

		<v-btn
			@click="$emit('reloadPage')"
			icon
		>
			<v-icon>refresh</v-icon>
		</v-btn>

		<v-tabs
			v-if="toolbarTabs"
			slot="extension"
			color="transparent"
			align-with-title
		>
			<v-tab v-for="tab in toolbarTabs" :key="tab.text">
				{{tab.text}}
			</v-tab>
		</v-tabs>

	</v-toolbar>
</template>

<script>
	export default {
		props: {
			appName: String,
			toolbarTabs: Array
		},
		data(){
			return {

			}
		}
	}
</script>

<style scoped>
	
</style>