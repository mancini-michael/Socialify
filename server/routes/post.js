const express = require("express").Router;

const {
  createPost,
  deleteAllPost,
  getAllPost,
  updatePostById,
  deletePostById,
} = require("../controllers/post");

const router = express();

router.route("/").post(createPost).get(getAllPost).delete(deleteAllPost);
router.route("/:id").get().patch(updatePostById).delete(deletePostById);

module.exports = router;
