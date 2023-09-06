const NodeGeoCoder = require('node-geocoder');
const options = {
    provider: process.env.GEOCODER_PROVIDER || 'mapquest',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY || 'pNVQmfi9Aji0WgFyeumtYlBrxjhUWAsm',
    formatter: null
}

const geocoder = NodeGeoCoder(options);
module.exports = geocoder;