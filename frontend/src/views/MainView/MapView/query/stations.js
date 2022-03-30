import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

export const getStations = async () => {
  const stationsRef = collection(db, "stations");
  const stationsQuery = query(stationsRef);
  const querySnapshot = await getDocs(stationsQuery);

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};
