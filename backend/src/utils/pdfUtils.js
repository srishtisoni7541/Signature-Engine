const fs = require("fs");
const crypto = require("crypto");

async function signPDF(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) throw new Error("Original PDF not found");

  fs.copyFileSync(inputPath, outputPath);

  const beforeBuffer = fs.readFileSync(inputPath);
  const afterBuffer = fs.readFileSync(outputPath);

  const beforeHash = crypto.createHash("sha256").update(beforeBuffer).digest("hex");
  const afterHash = crypto.createHash("sha256").update(afterBuffer).digest("hex");

  return { beforeHash, afterHash };
}

module.exports = { signPDF };
