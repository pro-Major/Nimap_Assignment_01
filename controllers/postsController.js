const db = require('../models/index')




exports.createPost = async (req, res) => {
    try {
        const data = await db.Posts.create({
            title: req.body.title,
            description: req.body.description,
            created_by: req.body.created_by,
            category: req.body.category
        })
        res.status(200).json({
            success : true,
            status: "Post Added Successfully ",
            data : data
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Something went Wrong",
            err: err
        })
    }
}

exports.getPosts = async (req,res) =>{

    try {
        const data = await db.Posts.findAndCountAll({

        })
        res.status(200).json({
            status: "All Products",
            products : data,
            count : data.count
        })
         
    } catch (error) {
        res.status(400).json({
            success : false,
            error : error
        })
    }
}