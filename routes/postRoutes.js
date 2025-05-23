const postControllers = require("../controllers/postControllers");
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authContrllers");
const { upload } = require("../utils/cloudinary");

router
  .route("/create-post")
  .post(
    authControllers.protect,
    upload.single("image"),
    postControllers.createPost
  );

router
  .route("/get-one-post/:id")
  .get(authControllers.protect, postControllers.getOnePst);
router
  .route("/update-post/:id")
  .patch(authControllers.protect, postControllers.updatePost);
router
  .route("/delete-post/:id")
  .delete(authControllers.protect, postControllers.deletePost);

router.route("/get-all-posts").get(postControllers.AllPosts);

router
  .route("/get-my-posts")
  .get(authControllers.protect, postControllers.ownAllPosts);

router.route("/get-posts-by-category/:category").get(
  // authControllers.protect,
  postControllers.allPostsOneCategory
);

module.exports = router;
