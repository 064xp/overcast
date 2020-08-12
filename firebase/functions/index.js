const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  functions.logger.log("Root route hit");
  return res.status(200).send("Request succesfull");
});

app.post("/values", async (req, res) => {
  const temp = req.query.temp;

  const writeTemp = await admin
    .firestore()
    .collection("latest")
    .doc("latestData")
    .set({ temperature: temp });

  functions.logger.log(writeTemp);

  res.json({
    result: `Wrote temperature: ${temp} succesfully`,
  });
});

exports.app = functions.https.onRequest(app);
