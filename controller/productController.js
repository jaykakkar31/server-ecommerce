const asyncHandler = require("express-async-handler");
const { Product } = require("../models/productmodel");

exports.getProducts = asyncHandler(async (req, res) => {
	const pageSize = 2;
	const page = Number(req.query.pageNumber) || 1;
	//get value after que mark
	const keyword = req.query.keyword
		? {
				name: {
					//we want get value of iphone even with iph
					// option i cas in sensitive
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const data = await Product.find({ ...keyword });
	const count = await Product.count({ ...keyword });

	// throw new Error("Something went wrong")
	res.json(data);
});

exports.getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404).send({ message: "Product not found" });
	}
});

exports.deleteProductsById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product is deleted" });
	} else {
		throw new Error("product not found");
	}
});

exports.createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
	const product = await new Product({
		name: req.body.name,
		image: req.body.image,
		description:req.body.description,
		brand: req.body.brand,
		user: req.user._id,
		category: req.body.category,
		price: req.body.price,
		countInStock: req.body.countInStock,
	});
    console.log(product);
	if (product) {
		await product.save();
		res.json(product);
	} else {
		throw new Error("product not found");
	}
});

exports.updateProduct = asyncHandler(async (req, res) => {
	const { name, brand, category, image, description, price, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		product.price = price;
		product.image = image;

		await product.save();
		res.json(product);
	} else {
		res.status(400);
		throw new Error("Not found");
	}
});

exports.createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Already reviewed");
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment: comment,
			user: req.user._id,
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => acc + item.rating, 0) /
			product.reviews.length;

		await product.save();
	} else {
		res.status(400);
		throw new Error("Not found");
	}
});

exports.getTopProducts = asyncHandler(async (req, res) => {
    //-1 for descending
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	

	res.json(products);
});
