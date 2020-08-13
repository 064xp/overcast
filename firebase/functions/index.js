const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

app.post("/values", async (req, res) => {
  const { temperature, humidity, light, waterLevel } = req.query;
  const timeStamp = admin.firestore.FieldValue.serverTimestamp();

  const writeTemp = await admin
    .firestore()
    .collection("latest")
    .doc("latestData")
    .set({ temperature, humidity, light, waterLevel, timeStamp });

  return res.status(200).send("Values updated");
});

exports.app = functions.https.onRequest(app);
