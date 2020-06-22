import axios, { AxiosInstance } from 'axios';

import decideApiURL from './decide-api-url';

export default function todoAPI(host: string = 'localhost'): AxiosInstance {
  return axios.create({
    baseURL: decideApiURL(host, 'todos', 1),
    withCredentials: true,
  });
}
