const admin = require("firebase-admin");

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
    newValues[key] = Number(queryParams[key]);
  });
  newValues.timeStamp = admin.firestore.FieldValue.serverTimestamp();
  return newValues;
};
