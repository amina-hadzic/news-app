import axios from "axios";

export const httpClient = axios.create({
   baseURL: 'http://localhost:3001/',
   headers: {'target-url': 'https://newsapi.org/', 'x-api-key': 'df3143cc42f54d2aa272f41fdb43620e'}
});