const express = require("express").Router;

const {
  createPost,
  deleteAllPost,
  getAllPost,
<<<<<<< HEAD
  getUserPost,
=======
  updatePostById,
  deletePostById,
>>>>>>> 1db7b4f1c5e1865744764f8ac683c6005ee8527e
} = require("../controllers/post");

const router = express();

router.route("/").post(createPost).get(getAllPost).delete(deleteAllPost);
<<<<<<< HEAD
router.route("/:id").get(getUserPost);
=======
router.route("/:id").get().patch(updatePostById).delete(deletePostById);
>>>>>>> 1db7b4f1c5e1865744764f8ac683c6005ee8527e

module.exports = router;
