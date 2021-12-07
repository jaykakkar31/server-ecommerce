const mongoose = require("mongoose");

const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,required:true
    },
    	user: {
			//uses all  _id from user model or adding user field in product
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},

},{timestamps:true})

const productSchema = new mongoose.Schema(
	{
		user: {
			//uses all  _id from user model or adding user field in product
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
			required: true,
		},
        reviews:[reviewSchema],
		numReviews: {
			type: Number,
			default: 0,
			required: true,
		},
		price: {
			type: Number,
			default: 0,
			required: true,
		},
		countInStock: {
			type: Number,
			default: 0,
			required: true,
		},
	
	},
	// Mongoose schemas have a timestamps option that tells Mongoose
	//to automatically manage createdAt and updatedAt properties on your documents.
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
