const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	// Mongoose schemas have a timestamps option that tells Mongoose 
    //to automatically manage createdAt and updatedAt properties on your documents.
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
