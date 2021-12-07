const express = require("express");
const userRouter = express.Router();
const { authProtect, admin } = require("../middleware/authMiddleware");

// const productData = require("../data/product");
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getAllUser,
	deleteUser,
	getUserById,
	updateUser,
} = require("../controller/userController");
//fetch product data from mogodb
userRouter.post("/login", authUser);
userRouter.get("/profile", authProtect, getUserProfile);
userRouter.post("/register", registerUser);
userRouter.patch("/profile", updateUserProfile);
userRouter.get("/", authProtect, admin, getAllUser);
userRouter.get("/:id",authProtect,admin,getUserById)
userRouter.delete("/:id", authProtect, admin, deleteUser);
userRouter.patch("/:id",authProtect,admin,updateUser)
module.exports = userRouter;
