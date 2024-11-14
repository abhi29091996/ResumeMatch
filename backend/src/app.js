// sharepoint-to-s3-sync/src/app.js
const path = require('path');
const sharePointService = require('./services/sharepoint');
const s3Service = require('./services/s3');
const fileUtils = require('./utils/file');
const logger = require('./utils/logger');

async function syncFilesFromSharePointToS3() {
  try {
    // Get file list from SharePoint
    const files = await sharePointService.getSharePointFileList();
    console.log(files)

    // Sync files to S3 bucket
    // for (const file of files) {
    //   const fileUrl = `${config.sharePointUrl}/_api/web/getfilebyserverrelativeurl('${file.ServerRelativeUrl}')/$value`;
    //   const filePath = path.join('/tmp', file.Name);

    //   // Download file from SharePoint
    //   await fileUtils.downloadFileFromSharePoint(fileUrl, config.sharePointUser, config.sharePointPassword, filePath);

    //   // Upload file to S3
    //   await s3Service.uploadFileToS3(file.Name, filePath);
    // }

    logger.info('Sync complete');
  } catch (error) {
    logger.error('Error syncing files:', error);
  }
}

module.exports = {
  syncFilesFromSharePointToS3
};