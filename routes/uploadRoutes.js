const path=require( "path");
const express =require("express");
const multer =require( "multer");
const router = express.Router();


function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = path.extname(file.originalname).toLowerCase().match(filetypes);
	const mimetype = file.mimetype.match(filetypes);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Images only!");
	}
}

const upload = multer({
	storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, path.join("uploads/"));
        },
        filename(req, file, cb) {
            console.log(file)
            const [filename,ext] = file.originalname.split('.');
            cb(
                null,
                `${filename}-${Date.now()}.${ext}`
            );
        },
    }),
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});




router.post("/", upload.single('image'), (req, res) => {
    console.log("reached");
	res.json(`/${req.file.path}`);
});

module.exports = router;
