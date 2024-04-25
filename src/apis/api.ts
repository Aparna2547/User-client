import axios from "axios"

const baseUrl = 'http://localhost:3000'

const token = localStorage.getItem('token') || null

const Api = axios.create({baseURL:baseUrl,
    withCredentials:true,
    headers: {
        'token': token
    }
});

export default Api;