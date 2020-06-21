import axios from 'axios';

import decideApiURL from './decide-api-url';

export default axios.create({ baseURL: decideApiURL('todos', 1), withCredentials: true });
