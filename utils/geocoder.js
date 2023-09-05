const NodeGeoCoder = require('node-geocoder');

console.log(process.env.MONGOOSE_URI)
const options = {
    provider: process.env.GEOCODER_PROVIDER || 'mapquest',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY || 'pNVQmfi9Aji0WgFyeumtYlBrxjhUWAsm',
    formatter: null
}

console.log(options);
const geocoder = NodeGeoCoder(options);
module.exports = geocoder;