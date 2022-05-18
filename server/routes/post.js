const express = require("express").Router;

const { createPost, getAllPost, updatePostById, deletePostById } = require("../controllers/post");

const router = express();

router.route("/").post(createPost).get(getAllPost);

router.route("/:id").patch(updatePostById);

router.route("/:id").delete(deletePostById);

module.exports = router;
