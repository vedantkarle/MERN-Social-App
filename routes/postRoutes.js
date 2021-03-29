const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const body = req.body.body;

      if (body.trim() === "") {
        return res
          .status(400)
          .json({ message: "Post body must not be empty!" });
      }

      const newPost = new Post({
        body,
        username: req.user.username,
        user: req.user.id,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (req.user.username === post.username) {
        await post.delete();
        return res.status(200).json({ message: "Post deleted successfully" });
      } else {
        return res.status(400).json({ message: "Action not allowed" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.post(
  "/:id/comment",
  auth,
  asyncHandler(async (req, res) => {
    const { body } = req.body;

    if (body.trim() === "") {
      return res.status(400).json({ message: "Empty Comment!" });
    }

    const post = await Post.findById(req.params.id);

    if (post) {
      post.comments.unshift({
        body,
        username: req.user.username,
        createdAt: new Date().toISOString(),
      });
      await post.save();
      return res.status(200).json({ message: "Comment posted successfully" });
    } else {
      return res.status(400).json({ message: "Post not found!" });
    }
  })
);

router.delete(
  "/:id/comment/:commentId",
  auth,
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === req.params.commentId
      );

      if (post.comments[commentIndex].username === req.user.username) {
        post.comments.splice(commentIndex, 1);
        await post.save();

        return res.status(200).json(post);
      } else {
        return res.status(400).json({ message: "Action not allowed" });
      }
    } else {
      return res.status(400).json({ message: "Post not found!" });
    }
  })
);

router.post(
  "/:id/like",
  auth,
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.likes.find((like) => like.username === req.user.username)) {
        post.likes = post.likes.filter(
          (like) => like.username !== req.user.username
        );
        await post.save();
      } else {
        post.likes.push({
          username: req.user.username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message: "Post not found!" });
    }
  })
);

module.exports = router;
