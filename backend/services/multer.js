const multer = require("multer");

//set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now) + path.extname(file.originalname);
  },
});

//init upload
const upload = (path) =>
  multer({
    storage: storage(path),
    fileFilter: (req, file, cb) => {
      //allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      //check ext
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      //check mime
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Only .png, .jpg, .jpeg and gif format allowed!'");
      }
    },
  });

module.exports = upload;
