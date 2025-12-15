require("dotenv").config({path:'../.env'});
// console.log('Mongo URI:', process.env.MONGO_URL);
const express = require("express");
const path = require("path");
const pdfRoutes = require("./routes/pdfRoutes");
const cors =require('cors');
const morgan= require('morgan');
require('./config/db');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use("/uploads/signed", express.static(path.join(__dirname, "uploads/signed")));

// Routes
app.use("/pdf", pdfRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
