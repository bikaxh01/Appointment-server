import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "documents/");
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
