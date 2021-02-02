import axios from 'axios';

// Development Url
const axiosinstance = axios.create({
   baseURL: 'http://localhost:5000/'
});
export default axiosinstance;