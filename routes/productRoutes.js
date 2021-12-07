const express = require("express");

const productRouter = express.Router();
//handling exceptions inside the route
const asyncHandler = require("express-async-handler");

// const productData = require("../data/product");
const { Product } = require("../models/productmodel");
const {
	getProducts,
	getProductById,
	deleteProductsById,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} = require("../controller/productController");
const { authProtect, admin } = require("../middleware/authMiddleware");
//fetch product data from mogodb
productRouter.get("/", getProducts);

//fetch product single data using id from mogodb

productRouter.get("/:id", getProductById);

productRouter.delete("/:id", authProtect, admin, deleteProductsById);
productRouter.patch("/:id", authProtect, admin, updateProduct);
productRouter.post("/", authProtect, admin, createProduct);
productRouter.post("/:id/review", authProtect, createProductReview);
productRouter.get("/top/products", getTopProducts);
module.exports = productRouter;
