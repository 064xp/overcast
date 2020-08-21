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
  const isValidApiKey = await validateApiKey(req.body.apiKey, apiKeysRef);
  if (!isValidApiKey) {
    return res.status(401).send("Invalid API Key");
  }

  const historyRef = admin.firestore().collection("history");
  let historic = await getLatestDoc(historyRef);
  let newValues = constructNewValueObject(req.body);
  let timeDelta = null;
  const maxTimeDelta = 60; //Time between every time values are pushed to history in minutes

  //if there is at least one document in the history
  if (historic) {
    //time between now and the last saved values in history in MINUTES
    timeDelta = (Date.now() - historic.timeStamp.toDate()) / 1000 / 60;
  }

  //Push values to history every hour or if there is nothing in history
  if (timeDelta >= maxTimeDelta || timeDelta === null) {
    historyRef.add(newValues);
  }

  await admin.firestore().collection("latest").doc("latestData").set(newValues);
  return res.status(200).send("Values updated");
});

exports.app = functions.https.onRequest(app);
