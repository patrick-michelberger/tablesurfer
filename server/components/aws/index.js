var AWS = require('aws-sdk');
var config = require('../../config/environment');

var AWSService = {};

// AWS Initialization
AWS.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    signatureVersion: 'v4'
});

AWSService.uploadS3 = function(bucketName, imageName, imageData, imageType, callback) {
    var s3bucket = new AWS.S3({ params: { Bucket: bucketName } });
    s3bucket.createBucket(function(err) {
        var params = {
            Bucket: bucketName,
            Key: imageName,
            Body: imageData,
            ContentType: imageType,
            ACL: 'public-read'
        };
        s3bucket.putObject(params, function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, "https://" + bucketName + ".s3.amazonaws.com/" + imageName);
            }
        });
    });
};

module.exports = AWSService;
