const { Order } = require("../models/ordermodel");
const asyncHandler = require("express-async-handler");

exports.addOrderItems = asyncHandler(async (req, res) => {
	console.log("CALLED ADD TO CART");
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		shippingPrice,
		totalPrice,
		itemsPrice,
		taxPrice,
	} = req.body;
	// console.log(req.body);
	if (orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items exist");
	} else {
		console.log(shippingAddress);
		const newOrder = new Order({
			user: req.user._id,
			shippingAddress: shippingAddress,
			paymentMethod: paymentMethod,
			orderItems: orderItems,
			taxPrice: taxPrice,
			shippingPrice: shippingPrice,
			totalPrice: totalPrice,
			itemsPrice: itemsPrice,
		});

		const createdOrder = await newOrder.save();

		if (createdOrder) {
			res.status(200).json(newOrder);
		}
	}
});

exports.getOrderItemsById = asyncHandler(async (req, res) => {
	// console.log(req.body);
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	console.log(order);
	if (order) {
		res.json({
			order,
		});
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

exports.updateOrderIsPaid = asyncHandler(async (req, res) => {
	// console.log(req.body);
	const order = await Order.findById(req.params.id);
	console.log(order);
	if (order) {
		order.paidAt = Date.now();
		order.isPaid = true;
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

exports.getAllMyOrders = asyncHandler(async (req, res) => {
	const order = await Order.find({ user: req.user._id });
	if (order) {
		res.json(order);
	}
});


exports.getAllOrders = asyncHandler(async (req, res) => {
	const order = await Order.find({  }).populate("user","_id name")
	console.log(order, "ORDER");
	if (order) {
		res.json(order);
	}
});

exports.updateOrderIsDelivered= asyncHandler(async (req, res) => {
	// console.log(req.body);
	const order = await Order.findById(req.params.id);
	console.log(order);
	if (order) {
		order.deliveredAt = Date.now();
		order.isDelivered = true;
		// order.paymentResult = {
		// 	id: req.body.id,
		// 	status: req.body.status,
		// 	update_time: req.body.update_time,
		// 	email: req.body.payer.email_address,
		// };
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});
