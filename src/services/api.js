import axios from 'axios';

const api = axios.create({
    baseURL:   'https://qrup-app.herokuapp.com',
    headers:{
        'Content-Type' : 'application/json'
    }
})

/*api.addResponseTransform(response =>{
    if (!response.ok) throw response;  
})*/
export default api;
