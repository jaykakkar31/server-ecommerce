const express = require("express");
const orderRouter = express.Router();
const { authProtect,admin } = require("../middleware/authMiddleware");

// const productData = require("../data/product");
const {
	addOrderItems,
	getOrderItemsById,
	updateOrderIsPaid,

	getAllMyOrders,
	getAllOrders,
	updateOrderIsDelivered,
} = require("../controller/orderController");
//fetch product data from mogodb

orderRouter.post("/", authProtect,addOrderItems);
orderRouter.get("/myorders", authProtect, getAllMyOrders);

orderRouter.get("/:id", getOrderItemsById);
orderRouter.patch("/:id/pay",authProtect, updateOrderIsPaid);
orderRouter.get("/", authProtect, admin, getAllOrders);
orderRouter.patch("/:id/deliver",authProtect,admin,updateOrderIsDelivered)
module.exports = orderRouter;
