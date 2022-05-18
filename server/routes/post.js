const express = require("express").Router;

const {
  createPost,
  deleteAllPost,
  getAllPost,
  getUserPost,
  updatePostById,
  deletePostById,
} = require("../controllers/post");

const router = express();

router.route("/").post(createPost).get(getAllPost).delete(deleteAllPost);
router
  .route("/:id")
  .get(getUserPost)
  .patch(updatePostById)
  .delete(deletePostById);

module.exports = router;
