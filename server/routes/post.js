const express = require("express").Router;

const {
  createPost,
  deleteAllPost,
  getAllPost,
} = require("../controllers/post");

const router = express();

router.route("/").post(createPost).get(getAllPost).delete(deleteAllPost);
router.route("/:id").get();

module.exports = router;
