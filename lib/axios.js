const axios = require('axios').default;
require('dotenv').config();

const ClickEntregas = axios.create({
  baseURL: 'https://robotapitest-br.borzodelivery.com/api/business/1.1/calculate-order',
  headers: {
    'Content-Type': 'application/json',
    'X-DV-Auth-Token': process.env.CLICKENTREGAS_TOKEN,
  },
});

module.exports = { ClickEntregas };
