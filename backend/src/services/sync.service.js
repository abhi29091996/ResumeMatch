const SharePointService = require('./sharepoint');
const S3Service = require('./s3');
const logger = require('../utils/logger');

class SyncService {
  constructor() {
    this.sharePointService = new SharePointService();
    this.s3Service = new S3Service();
  }

  async startSync() {
    await this.processFolder('');
  }

  async processFolder(folderPath) {
    try {
      const files = await this.sharePointService.listFiles(folderPath);
      
      for (const item of files) {
        if (item.folder) {
          await this.processFolder(`${folderPath}/${item.name}`);
        } else {
          await this.processFile(item, folderPath);
        }
      }
    } catch (error) {
      logger.error(`Error processing folder ${folderPath}:`, error);
      throw error;
    }
  }

  async processFile(file, folderPath) {
    try {
      const fileContent = await this.sharePointService.downloadFile(file['@microsoft.graph.downloadUrl']);
      const s3Key = this.s3Service.generateS3Key(folderPath, file.name);
      
      await this.s3Service.uploadFile(s3Key, fileContent, {
        lastModified: file.lastModifiedDateTime,
        contentType: file.file.mimeType,
        size: file.size.toString()
      });
      
      logger.info(`Successfully synced file: ${s3Key}`);
    } catch (error) {
      logger.error(`Error processing file ${file.name}:`, error);
      throw error;
    }
  }
}

module.exports = { SyncService };