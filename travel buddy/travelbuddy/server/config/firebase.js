// import admin from "firebase-admin";
// import dotenv from "dotenv";
// dotenv.config();

// if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
//   console.warn(
//     "FIREBASE_SERVICE_ACCOUNT_JSON missing; protected routes will fail"
//   );
// } else {
//     console.log("ENV VALUE:", process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

//   const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export default admin;
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
