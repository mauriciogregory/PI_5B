import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:5001',
    responseType: 'json'
});

export default instance;

