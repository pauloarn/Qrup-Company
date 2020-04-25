import axios from 'axios';

const api = axios.create({
    baseURL:   'http://159.203.183.67:3333',
    headers:{
        'Content-Type' : 'application/json'
    }
})

/*api.addResponseTransform(response =>{
    if (!response.ok) throw response;  
})*/
export default api;
