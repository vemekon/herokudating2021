var admin = require("firebase-admin");

var serviceAccount = require("../config/mekele-77f49-firebase-adminsdk-vjzzu-4a5548515d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mekele-77f49.firebaseio.com",
});
module.exports = admin;
