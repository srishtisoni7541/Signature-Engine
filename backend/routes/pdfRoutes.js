const express = require("express");
const router = express.Router();
const { saveSignaturePDF } = require("../controllers/pdfController");

router.post("/save-signature", express.json({ limit: "10mb" }), saveSignaturePDF);


module.exports = router;
