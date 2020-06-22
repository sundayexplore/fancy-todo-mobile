import axios, { AxiosInstance } from 'axios';

import decideApiURL from './decide-api-url';

export default function userAPI(host: string = 'localhost'): AxiosInstance {
  return axios.create({
    baseURL: decideApiURL(host, 'users', 1),
    withCredentials: true,
  });
}
