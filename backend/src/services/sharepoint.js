// sharepoint-to-s3-sync/src/services/sharepoint.js
const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

async function getSharePointFileList() {
  try {
    // Authenticate with SharePoint
    const sharePointAuth = await axios.post(`https://login.microsoftonline.com/`, null, {
      auth: {
        username: 'abhishek.patel@carrier.com',
        password: ''
      }
    });
    console.log('asd',sharePointAuth.data)
  
    const requestDigest = sharePointAuth.data.d.GetContextWebInformation.FormDigestValue;

    console.log(sharePointAuth)
    // Get file list from SharePoint
    const fileListResponse = await axios.get(`https://carcgl-my.sharepoint.com/my?id=%2Fpersonal%2Fabhishek%5Fpatel%5Fcarrier%5Fcom%2FDocuments%2FFiles&ga=1`, {
      headers: {
        'X-RequestDigest': requestDigest
      }
    });

    return fileListResponse.data.d.results;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      logger.error('Error fetching SharePoint file list: Forbidden (403)');
      logger.error('Please check your SharePoint credentials and permissions.');
    } else {
      logger.error('Error fetching SharePoint file list:', error);
    }
    throw error;
  }
}

module.exports = {
  getSharePointFileList
};