const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.createPost = catchAsync(async (req, res, next) => {
  const { file, caption, category } = req.body;

  const post = await Post.create({
    file,
    caption,
    category,
    creator: req.user._id,
  });

  if (!post) {
    return next(new appError("Requested post was not created.", 400));
  }

  res.status(200).json({
    message: "Post has been created successfully.",
    status: 200,
    data: post,
  });
});

exports.getOnePst = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new appError("Requested post was not found.", 404));
  }
  res.status(200).json({
    message: "Requested post found successfully.",
    status: 200,
    data: post,
  });
});
