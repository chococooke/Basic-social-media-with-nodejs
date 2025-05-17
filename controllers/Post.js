const { Post, Comment } = require("../Models/index.js");

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment, as: "Comments" }], 
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.insertPost = async (req, res) => {
  try {
    const post = await Post.create(req.body); 
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.insertComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body); 
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};