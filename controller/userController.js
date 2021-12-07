const asyncHandler = require("express-async-handler");
const { User } = require("../models/usermodel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const { generateToken } = require("../utils/generateToken");
exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// console.log(req.body, "AUTH");
	const user = await User.findOne({ email: email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

exports.registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	// console.log(req.body, "USER");

	const userExist = await User.findOne({ email: email });
	if (userExist) {
		res.status(401);
		throw new Error("User already exist");
	} else {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				// console.log(salt, password);
				if (!err) {
					hashedPassword = hash;
					const newUser = new User({
						email: email,
						name: name,
						password: hash,
					});
					newUser.save(() => {
						console.log("saved");
					});
					if (newUser) {
						res.status(200).json({
							_id: newUser._id,
							name: newUser.name,
							email: newUser.email,
							isAdmin: newUser.isAdmin,
							token: generateToken(newUser._id),
						});
					} else {
						res.status(400);
						throw new Error("User not found");
					}
				} else {
					res.status(400);
					throw new Error(err);
				}
			});
		});
		// console.log(hashedPassword, "hashPassword");

		// const newUser = new User({
		// 	email: email,
		// 	name: name,
		// 	password: hashedPassword,
		// });
		// newUser.save(() => {
		// 	console.log("saved");
		// });
		// console.log(newUser, "NEW USER");
		// if (newUser) {
		// 	res.status(200).json({
		// 		_id: newUser._id,
		// 		name: newUser.name,
		// 		email: newUser.email,
		// 		isAdmin: newUser.isAdmin,
		// 		token: generateToken(newUser._id),
		// 	});
		// } else {
		// 	res.status(400);
		// 	throw new Error("User not found");
		// }
	}
});

exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			// token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("User not found");
	}
	// res.send("Success");
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
	const { name, email, password, id } = req.body;
	console.log(req.body);
	const user = await User.findById(id);
	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		if (password) {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					user.password = hash;
				});
			});
		}
		const updateUser = await user.save();
		res.status(200).json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			token: generateToken(updateUser._id),
		});
	} else {
		res.status(401);
		throw new Error("User not found");
	}
	// res.send("Success");
});

exports.getAllUser = asyncHandler(async (req, res) => {
	const user = await User.find({});
	if (user) {
		res.json(user);
	}
});

exports.deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	res.json({ message: "user removed" });
});

exports.getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.json(user);
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	const { email, name, isAdmin } = req.body;
	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.isAdmin = isAdmin 
		const updateUser = await user.save();
		res.status(200).json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			token: generateToken(updateUser._id),
		});
	} else {
		res.status(401);
		throw new Error("User not found");
	}
	// res.send("Success");
});
