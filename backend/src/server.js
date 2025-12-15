require("dotenv").config({ path: "../.env" });
const express = require("express");
const path = require("path");
const pdfRoutes = require("./routes/pdfRoutes");
const morgan = require("morgan");
require("./config/db");

const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://signature-engine-blond.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(morgan("dev"));

app.use(express.json());

app.use("/uploads/signed", express.static(path.join(__dirname, "uploads/signed")));

app.use("/pdf", pdfRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
