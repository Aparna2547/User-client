import axios from "axios"
import store from "../Store/store";
const baseUrl = 'http://localhost:3000'



// const token = localStorage.getItem("token");
const state = store.getState();
console.log(state.auth.token)
const token = state.auth.token

const Api = axios.create({baseURL:baseUrl,
    withCredentials:true,
    headers: {
        'token':token
      }    
});

export default Api;