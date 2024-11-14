// sharepoint-to-s3-sync/src/config/environments.js
module.exports = {
    development: {
      sharePointUrl: 'https://carcgl-my.sharepoint.com/personal/abhishek_patel_carrier_com',
      sharePointUser: 'abhishek.patel@carrier.com',
      sharePointPassword: 'Abhi81094#',
      s3BucketName: 'your-s3-bucket-name',
      awsAccessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
      awsSecretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
      awsRegion: 'us-east-1'
    },
    staging: {
      // Staging environment configuration
    },
    production: {
      // Production environment configuration
    }
  };