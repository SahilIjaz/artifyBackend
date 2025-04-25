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

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  post.caption = req.body.caption;
  await post.save();
  res.status(200).json({
    message: "Requested post has been updated successfully.",
    status: 200,
    data: post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    creator: req.user._id,
  });

  if (!post) {
    return next(new appError("Requested post was not found.", 404));
  }

  res.status(201).json({
    message: "Requested post deleted successfully.",
    status: 201,
    data: null,
  });
});

exports.deleteByAdmin = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new appError("Requested post was not deleted.", 404));
  }

  re.status(201).json({
    message: "Requested post deleted successfully.",
    status: 201,
    data: null,
  });
});

exports.ownAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ creator: req.user._id });

  res.status(200).json({
    message: "All posts created by yu found successfully.",
    status: 200,
    length: posts.length,
    data: posts,
  });
});
