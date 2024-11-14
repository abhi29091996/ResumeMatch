// sharepoint-to-s3-sync/src/config/index.js
const environments = require('./environments');

const config = environments[process.env.NODE_ENV || 'development'];

module.exports = config;