const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

favoriteSchema.pre(/^find/, function (next) {
  this.populate({
    path: "post",
  });
  this.populate({
    path: "creator",
  });
  next();
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
