const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// The `/api/comments` endpoint

// GET all comments from comment table
router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ["user_name"],
          },
          {
            model: Post,
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST a new comment to commment table
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT/update a specific comment
router.put("/:id", async (req, res) => {
    try {
      const commentData = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(400).json({ message: "No comment found!" });
        return;
      }
  
      console.log("Comment updated!");
      res.status(200).json(commentData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

// DELETE a comment from comment table
router.delete("/:id", async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!commentData) {
        res.status(404).json({ message: "No comment found!" });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
