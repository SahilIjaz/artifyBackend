const Favorite = require("../models/favoriteModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.makeOrRemoveFavorite = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.findOne({
    post: req.params.id,
    creator: req.user._id,
  });
  if (favorite) {
    await Favorite.findByIdAndDelete(favorite._id);
    return res.status(200).json({
      message: "Request post removed from favorites.",
      status: 200,
      data: favorite,
    });
  } else {
    const newFavorite = await Favorite.create({
      post: req.params.id,
      creator: req.user._id,
    });
    if (!newFavorite) {
      return next(new appError("Requested favorite was not created.", 400));
    }
    return res.status(200).json({
      message: "Request post added to favorites.",
      status: 200,
      data: newFavorite,
    });
  }
});

exports.myFavoriteLists = catchAsync(async (req, res, next) => {
  const favorites = await Favorite.find({ creator: req.user });
  if (!favorites) {
    return next(new appError("You have no favorites.", 404));
  }
  res.status(200).json({
    message: "Your all favorites found successfully.",
    status: 200,
    length: favorites.length,
    data: favorites,
  });
});
