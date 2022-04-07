const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const {
  getLatestDoc,
  constructNewValueObject,
  validateApiKey,
} = require("./helperFunctions.js");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
const apiKeysRef = admin.firestore().collection("apiKeys");

app.post("/values", async (req, res) => {
  const stationRef = await validateApiKey(req.body.apiKey, apiKeysRef);
  if (!stationRef) {
    return res.status(401).send("Invalid API Key");
  }

  let newValues = constructNewValueObject(req.body);
  await stationRef.set(newValues, { merge: true });
  return res.status(200).send("Values updated");
});

exports.app = functions.https.onRequest(app);
