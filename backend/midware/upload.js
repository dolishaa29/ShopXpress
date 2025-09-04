const multer = require('multer');
let path=require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});


function upload(req, res, next, fieldName = 'image') {
 
  uploads.single(fieldName)(req, res, function(err) {
    if (err) {
 
      return res.status(400).json({ success: false, message: err.message });
    }

    next(); 
  });
}

module.exports = uploads;