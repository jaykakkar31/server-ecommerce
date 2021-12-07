const bcrypt=require("bcryptjs")
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("123456", salt);

const userData = [
	{
		name: "Admin",
		email: "admin@admin.com",
		password: hash,
		isAdmin: true,
	},
	{
		name: "jay",
		email: "jay@admin.com",
		password: hash,
	},
	{
		name: "manan",
		email: "manan@admin.com",
		password: hash,
	},
];

module.exports =userData