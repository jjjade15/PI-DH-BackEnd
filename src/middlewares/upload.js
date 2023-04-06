const multer = require("multer");

//Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/productImages/multerImages');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storage });

module.exports = upload;