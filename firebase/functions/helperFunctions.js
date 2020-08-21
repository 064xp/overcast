const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.getLatestDoc = async (docRef) => {
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

exports.constructNewValueObject = (queryParams) => {
  let newValues = {};
  Object.keys(queryParams).map((key, index) => {
    if (key !== "apiKey") {
      newValues[key] = Number(queryParams[key]);
    }
  });
  newValues.timeStamp = admin.firestore.FieldValue.serverTimestamp();
  return newValues;
};

exports.validateApiKey = async (apiKey, apiKeysRef) => {
  if (!apiKey) {
    return false;
  }
  const querySnapshot = await apiKeysRef.where("apiKey", "==", apiKey).get();

  return !querySnapshot.empty;
};
