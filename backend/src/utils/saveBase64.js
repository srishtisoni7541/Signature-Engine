const fs = require("fs");

module.exports = function saveBase64Image(base64, filePath) {
  const data = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  fs.writeFileSync(filePath, buffer);
};
