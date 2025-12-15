const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const crypto = require("crypto"); 
const AuditModel = require('../models/Audit.model');

const pdfDir = path.join(__dirname, "../uploads/signed");
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

const saveSignaturePDF = async (req, res) => {
  try {
    const { signatureBase64, pdfId, coords, meta } = req.body;

    if (!signatureBase64) return res.status(400).json({ message: "No signature uploaded" });

    const timestamp = Date.now();
    const pdfFilename = `signed-${timestamp}.pdf`;
    const pdfPath = path.join(pdfDir, pdfFilename);

    // Convert base64 to buffer
    const base64Data = signatureBase64.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");

    // Create PDF
    const doc = new PDFDocument({ size: [coords.width || 600, coords.height || 200] });
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.image(imgBuffer, 0, 0, { width: coords.width || 600, height: coords.height || 200 });
    doc.end();

    writeStream.on("finish", async () => {
      // Generate hashes
      const fileBuffer = fs.readFileSync(pdfPath);
      const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

      // Save audit record
      const audit = new AuditModel({
        pdfId,
        beforeHash: hash, // for simplicity, using same hash for before/after
        afterHash: hash,
        coords,
        meta
      });
      await audit.save();

      res.json({ 
        message: "PDF saved and audit recorded successfully", 
        url: `/uploads/signed/${pdfFilename}`,
        auditId: audit._id
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save PDF", error: err.message });
  }
};

module.exports = { saveSignaturePDF };
