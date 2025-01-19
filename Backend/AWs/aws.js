const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAXKPUZL3WFXLVUEOT',
    secretAccessKey: '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',
    region: 'ap-south-1'
});

const s3 = new AWS.S3();


s3.uploadFile = (params) => {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

module.exports = s3;
