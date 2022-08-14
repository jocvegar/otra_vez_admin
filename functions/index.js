const serviceAccount = require("./permissions.json");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
// const cors = require("cors")({ origin: true });

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

app.get("/api/users", (req, res) => {
  (async () => {
    const users = await db.collection("users").get();
    const usersArray = users.docs.map((doc) => doc.data());
    if (usersArray.length > 0) {
      res.status(200).send(usersArray);
    } else {
      res.status(404).send("No users found");
    }
  })();
});

exports.users = functions.https.onRequest(app);
