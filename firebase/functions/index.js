const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

app.post("/values", async (req, res) => {
  const historyRef = admin.firestore().collection("history");
  let newValues = {};
  let historic = await getLatestDoc(historyRef);
  let timeDelta = null;

  //Construct new value object
  Object.keys(req.query).map((key, index) => {
    newValues[key] = Number(req.query[key]);
  });
  newValues.timeStamp = admin.firestore.FieldValue.serverTimestamp();

  if (historic) {
    //time between now and the last saved values in history in MINUTES
    timeDelta = (Date.now() - historic.timeStamp.toDate()) / 1000 / 60;
    console.log(timeDelta);
  }

  //Push values to history every hour or if there is nothing in history
  if (timeDelta >= 60 || timeDelta === null) {
    historyRef.add(newValues);
  }

  await admin.firestore().collection("latest").doc("latestData").set(newValues);

  return res.status(200).send("Values updated");
});

const getLatestDoc = async (docRef) => {
  const querySnapshot = await docRef
    .orderBy("timeStamp", "desc")
    .limit(1)
    .get();
  let data;
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
};
exports.app = functions.https.onRequest(app);
