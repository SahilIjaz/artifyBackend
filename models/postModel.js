const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },
    caption: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
  });
  this.populate({
    path: "category",
  });
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
