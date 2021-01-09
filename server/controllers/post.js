const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  try {
    const post = await Post.find({}).select("_id title body");
    res.json({ post });
  } catch (error) {
    console.log(error);
  }
};
exports.createPosts = async (req, res) => {
  console.log(req.body);
  try {
    const post = await new Post(req.body);
    post.postedBy = req.user;
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error });
  }
};
