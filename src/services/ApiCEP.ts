import axios from 'axios';

import Config from 'Config';

const ApiCEP = axios.create({
  baseURL: Config.services.VIACEP.baseURL,
});

export default ApiCEP;
