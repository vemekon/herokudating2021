const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const { createPosts, getPosts } = require("../controllers/post");
//const { createPosts, getPosts } = require("../controllers/post");

router.post("/post", authCheck, createPosts);
//router.post("/post", createPosts);
router.get("/posts", getPosts);

module.exports = router;
