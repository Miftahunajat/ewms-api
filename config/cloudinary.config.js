const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'english-kids-talk',
    api_key: '724691991473781',
    api_secret: '-BTkmr6K3p00HKjkbfqK8OhhVFo'
});

module.exports = cloudinary;