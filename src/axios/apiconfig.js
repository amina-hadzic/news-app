import axios from "axios";

export const httpClient = axios.create({
   baseURL: 'http://localhost:3001/',
   headers: {'target-url': 'https://newsapi.org/', 'x-api-key': '3c4ff19208fd4b70a16370ded668a5c2'}
});