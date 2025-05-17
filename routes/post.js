const {
  getAllPosts,
  insertComment,
  insertPost,
} = require("../controllers/Post.js");

const router = require("express").Router();

router.get("/", getAllPosts);
router.post("/posts", insertPost);
router.post("/comments", insertComment);

module.exports = router;