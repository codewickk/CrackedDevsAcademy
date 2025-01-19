const multer = require('multer');
const Upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, 
        files: 2 
    },
    fileFilter: (req, file, cb) => {
  
        const allowedVideoTypes = ['video/mp4'];
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        
        if (file.fieldname === 'video' && allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else if (file.fieldname === 'thumbnail' && allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Video must be MP4, Thumbnail must be JPEG/PNG'), false);
        }
    }
});

module.exports = { Upload };