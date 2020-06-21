import axios from 'axios';

import decideApiURL from './decide-api-url';

export default axios.create({ baseURL: decideApiURL('users', 1) });
