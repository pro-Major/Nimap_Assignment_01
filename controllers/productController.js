const multer = require('multer')
const db = require('../models/index')
const port = 'http://localhost:3000'


// Storing the image in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true); // Accept the file;
    } else {
        cb(null, false); // Rejects the file
    }
};

// to store the image in the destination folder
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});

exports.createProduct = [uploads.single('Image'), async (req, res) => {

    try {
        const data = await db.Products.create({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productImage: port + "/uploads/" + req.file.filename,
            categoryId: req.body.categoryId,
            description: req.body.description,
            stock: req.body.stock
        })
        res.status(200).json({
            success: true,
            status: "Product added successfully",
            data
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Something went Wrong",

            err: (err.name == 'SequelizeUniqueConstraintError' ? 'Product Already Exist' : err.name)
        })
    }
}]



exports.getProduct = async (req, res) => {
    try {



        const data = await db.Products.findAll({
            include: [
                {
                    model: db.Category,
                }
            ]
        })
        res.status(200).json({
            success: true,
            count: data.count,
            status: "All Products",
            products: data

        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Something went Wrong"
        })
    }
}


exports.getProductById = async (req, res) => {
    try {
        const data = await db.Products.findByPk(req.params.id);
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ data })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    }
}


exports.deleteProductById = async (req, res) => {
    try {
        const data = await db.Products.destroy({ where: { id: req.params.id } });
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err.errors[0].message
        })
    }
}


exports.UpdateProductById = [uploads.single('Image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.file) {
            var data = {
                Image: port + "/uploads/" + req.file.filename,
                ...req.body
            }
        }
        else {
            var data = req.body
        }
        console.log(data)
        const updatedata = await db.Products.update(data, {
            where: { id: id }
        })
        return res.status(200).json({
            message: "Product Updated Successfully",
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err.errors[0].message
        })
    }
}
]


