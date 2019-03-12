import Vue from 'vue'
import Router from 'vue-router'

import Notes from '@/components/pages/Notes'
import NewNote from '@/components/pages/NewNote'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'mainPage',
			component: Notes
		},
		{
			path: '/new-note',
			name: 'new-note',
			component: NewNote
		}
	]
})