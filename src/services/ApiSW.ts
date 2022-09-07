import axios from 'axios';

import Config from 'Config';

const ApiSW = axios.create({
  baseURL: Config.services.SWAPI.baseURL,
});

export default ApiSW;
