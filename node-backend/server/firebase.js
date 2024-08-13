// Backend Firebase

var admin = require("firebase-admin");

var serviceAccount = require(".serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://real-k-express-default-rtdb.firebaseio.com"
});
