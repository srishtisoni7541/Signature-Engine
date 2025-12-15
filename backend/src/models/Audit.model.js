const mongoose = require('mongoose');

const AuditSchema =  mongoose.Schema({
  pdfId: { type: String, required: true },
  beforeHash: { type: String, required: true },
  afterHash: { type: String, required: true },
  coords: { type: Object, required: true },
  meta: { type: Object },
  createdAt: { type: Date, default: Date.now }
});
module.exports= mongoose.model("Audit", AuditSchema);
