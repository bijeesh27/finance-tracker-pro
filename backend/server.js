const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const userModel = require("./models/userModel");


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();


app.use("/api/transactions", require("./routes/transactionRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`.cyan.bold));
