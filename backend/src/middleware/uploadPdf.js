const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "src/uploads/originals"),
  filename: (req, file, cb) => {
    const id = uuidv4();
    req.pdfId = id;
    cb(null, `${id}.pdf`);
  }
});

module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs allowed"));
    }
    cb(null, true);
  }
});
