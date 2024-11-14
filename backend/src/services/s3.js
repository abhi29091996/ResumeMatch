// sharepoint-to-s3-sync/src/services/s3.js
const aws = require('aws-sdk');
const config = require('../config');

aws.config.update({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion
});

const s3 = new aws.S3();

async function uploadFileToS3(fileName, filePath) {
  try {
    await s3.putObject({
      Bucket: config.s3BucketName,
      Key: fileName,
      Body: filePath
    }).promise();

    console.log(`Uploaded ${fileName} to S3`);
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}

module.exports = {
  uploadFileToS3
};