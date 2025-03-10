import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://18.188.227.68:8000//api/',
    timeout: 5000, // timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
