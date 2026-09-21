const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes =
  require("./routes/authRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");


const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// MongoDB
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/authDB"
  )

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((error) => {
    console.log(
      "MongoDB Error:",
      error
    );
  });


// Routes
app.use("/", authRoutes);

app.use("/", dashboardRoutes);


// Server
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});