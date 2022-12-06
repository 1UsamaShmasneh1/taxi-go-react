import axios from 'axios';
const BASE_URL = 'https://localhost:7043/taxi/';

export default axios.create({
    baseURL: BASE_URL
});