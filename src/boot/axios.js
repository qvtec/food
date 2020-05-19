import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.Accept = 'application/json'
if (LocalStorage.has('token')) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
}

Vue.prototype.$axios = axios
