import axios from 'axios'

export default () => {
	return axios.create({
		baseURL: process.env.BASE_URL || 'http://localhost:8080/api'
	})
}