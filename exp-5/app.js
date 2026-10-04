const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnect");
const routes = require("./routes/contactRoutes");

connectDB();
const app = express();

app.use(express.json());
app.use("/api/contacts", routes);

app.listen(5000, () => console.log("Server running on 5000"));
