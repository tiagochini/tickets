import axios from 'axios';

export const url = process.env.APP_URL || 'http://localhost/api';

const api = axios.create({
    baseURL:url
})

export const _token = document.getElementById("csrf-token");

export default api;
