import axios from 'axios';

const http = axios.create({baseURL: 'http://20.214.226.173:8080/'});

export default http;
