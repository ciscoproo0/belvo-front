import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://belvo-api.herokuapp.com',
    // baseURL: 'http://localhost:3333'

});