const express = require("express");
const { getUsers } = require("../controllers/user");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
// controllers

router.get("/allUser", getUsers);
module.exports = router;
