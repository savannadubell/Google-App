const express = require("express");
const path = require("path");

const app = express();
const axios = require("axios");
require("dotenv").config();

// -------------------------------  MONGODB  ------------------------------
const mongoose = require("mongoose");

const dbName = "reactGoogleBooks";
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;
const db = require("./db/models")(mongoose);

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// -----------------------------  MIDDLEWARE  -----------------------------
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(require("compression")());
app.use(require("helmet")());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// -----------------------------  API ROUTES  -----------------------------
const  GOOGLE_API_SERVER_KEY = "AIzaSyCG1rStFFBiAIXVU5vHQnfyGz4pFtQgawk";
const apiRouter = express.Router();
require("./routes")(apiRouter, db, axios, GOOGLE_API_SERVER_KEY);

app.use("/api", apiRouter);

// Send every other request to the React app
// Define any API routes before this runs

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

const sampleBook = {
  title: "The Hunger Games",
  authors: ["Suzanne Collins"],
  description:
    "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
  image:
    "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  link:
    "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
};

