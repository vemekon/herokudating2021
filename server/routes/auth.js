const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, authUser } = require("../middlewares/auth");

// controller
const {
  createOrUpdateUser,
  currentUser,
  User,
  updateUser,
  getProfile,
  registerUser,
  initialSearch,
  messages,
  getMessages,
  messages1,
  newMessage,
  newMessage1,
  addFriend,
  listFriend,
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/user", authCheck, User);
router.post("/updateuser", authCheck, updateUser);
router.get("/getprofile", authCheck, getProfile);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.post("/registeruser", authCheck, registerUser);
router.post("/searchusers", authCheck, authUser, initialSearch);
router.post("/newmessage", authCheck, newMessage1);
//router.post("/messages", authCheck, messages1);
router.post("/messages", authCheck, newMessage1);
//router.post("/getmessages", authCheck, getMessages);
router.post("/addfriend", authCheck, addFriend);
router.get("/listfriend", authCheck, listFriend);

module.exports = router;
