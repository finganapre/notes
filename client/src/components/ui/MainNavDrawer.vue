<template>
	<v-navigation-drawer
		fixed
		clipped
		app
		v-model="mainNavbarDrawerLocal"
	>
				
				<v-list class="pt-0" dense>
				<v-divider></v-divider>
				
				<v-list-tile
					v-for="item in mainNavbarMenuList"
					:key="item.title"
					:to="item.link"
				>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<!-- START Services -->
				<v-list-group
					prepend-icon="note"
					v-if="notesNavList"
				>
					<v-list-tile slot="activator">
						<v-list-tile-title>Заметки</v-list-tile-title>
					</v-list-tile>
					<v-list-tile
						v-for="(note) in notesNavList"
						:key="note[2]"
						:to="note[2]"
					>
						<v-list-tile-title
							v-text="note[0]"
						>
						</v-list-tile-title>
						<v-list-tile-action class="v-list-tile-action">
							<v-icon v-text="note[1]"></v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
				<!-- END Services -->
				</v-list>
			</v-navigation-drawer>

</template>

<script>
	export default {
		props: {
			mainNavbarDrawer: Boolean,
			notes: Array
		},
		data(){
					return {
						mainNavbarDrawerLocal: this.mainNavbarDrawer,

						mainNavbarMenuList: [
						  {title: 'На главную', icon: 'home', link: '/'},
						  {title: 'Новая заметка', icon: 'add_circle_outline',  link: 'new-note'}
						]
					}
				},
				computed: {
					notesNavList: function(){
						let links = [];

						this.notes.forEach(function(item){
							links.push([item.title, 'note', item.id]);
						});

						return links;
					}
				},
				watch: {
					mainNavbarDrawerLocal: function(){
						this.$emit('changeMainNavState', this.mainNavbarDrawerLocal);
					},
					mainNavbarDrawer: function(){
						this.mainNavbarDrawerLocal = this.mainNavbarDrawer;
					}
				}

	}
</script>

<style scoped>
	
</style>