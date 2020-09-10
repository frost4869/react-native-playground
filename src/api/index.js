const {create} = require('apisauce');

const api = create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

export default api;
