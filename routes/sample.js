const mongoose = require("mongoose");
const express = require("express");
const sampleDataRouter = express.Router();
const Userdata = require("../data/userData");
const Products = require("../data/product");
const { User } = require("../models/usermodel");
const { Product } = require("../models/productmodel");
const { Order } = require("../models/ordermodel");

sampleDataRouter.get("/", async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const createUser = await User.insertMany(Userdata);
		const adminUser = createUser[0]._id;
		const sampleProducts = Products.map((p) => {
			return { ...p, user: adminUser };
		});
		await Product.insertMany(sampleProducts);
		// console.log(sampleProducts);
	} catch (err) {
		console.log(err);
	}
});

module.exports = sampleDataRouter;
