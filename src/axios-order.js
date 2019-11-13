import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-mburger.firebaseio.com',
})

/*instance.interceptors.response.use(response =>{
    console.log('******************************');
    console.log(response);
    console.log('******************************');
    return response;
});*/


export default instance;