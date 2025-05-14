const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.createCategory = catchAsync(async (req, res, next) => {
  const { categoryName, categoryImage } = req.body;
  if (!(categoryName || categoryImage)) {
    return next(new appError("Please provide category name and image", 400));
  }
  const category = await Category.create({
    categoryName,
    categoryImage,
  });
  if (!category) {
    return next(new appError("Requested category was nt creaed.", 400));
  }
  return res.status(200).json({
    message: "Category has been created successfully.",
    status: 200,
    data: category,
  });
});

exports.getOneCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new appError("Requested categry was not found", 404));
  }
  return res.status(200).json({
    message: "Requested category found successfully.",
    status: 200,
    data: category,
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  console.log("THIS ROUTE HIT ");
  const categories = await Category.find();

  res.status(200).json({
    message: "All categories found successfully.",
    status: 200,
    length: categories.length,
    data: categories,
  });
});
