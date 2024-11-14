// sharepoint-to-s3-sync/src/utils/file.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadFileFromSharePoint(fileUrl, sharePointUser, sharePointPassword, filePath) {
  try {
    // Download file from SharePoint
    const fileResponse = await axios.get(fileUrl, {
      responseType: 'stream',
      auth: {
        username: sharePointUser,
        password: sharePointPassword
      }
    });

    // Save file to local disk
    const writer = fs.createWriteStream(filePath);
    fileResponse.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading file from SharePoint:', error);
    throw error;
  }
}

module.exports = {
  downloadFileFromSharePoint
};