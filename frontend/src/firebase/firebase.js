import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const latestRef = db.collection("latest").doc("latestData");
