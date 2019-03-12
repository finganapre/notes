import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import App from './App'
import router from './router'

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import ru from './locale/ru'

Vue.use(Vuetify, {
	// custom theme
	theme: {
		primary: "#3769AD",
		secondary: "#417CC4",
		accent: "#D1B46F",
		error: "#BE655E",
		warning: "#E5A050",
		info: "#5C9CD9",
		success: "#6EC47E"
	},

	lang: {
		locales: { ru },
		current: 'ru'
	}
})

import VeeValidate from 'vuetify';
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})