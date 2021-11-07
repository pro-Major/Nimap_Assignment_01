const db = require('../models/index')

exports.createCategory = async (req, res, next) => {
    try {
        const data = await db.Category.create({
            categoryName: req.body.categoryName
        })
        return res.status(200).json({
            status: "Added Successfully",
            category: data
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Something went wrong",
            err: err.errors[0].message
        })
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        // const getPagination = (page, size) => {
        //     const limit = size ? +size : 5;
        //     const offset = page ? page * limit : 0;
        //     return { limit, offset };
        // };
        // const getPagingData = (data, page, limit) => {
        //     const { count: totalItems, rows: category } = data;
        //     const currentPage = page ? +page : 0;
        //     const totalPages = Math.ceil(totalItems / limit);
        //     return { totalItems, category, totalPages, currentPage };
        // };
        // const { page, size } = req.query;
        // const { limit, offset } = getPagination(page, size)

        const data = await db.Category.findAndCountAll({
            // limit: limit,
            // offset: offset,
        })
        // const { category } = getPagingData(data, page, limit)
        return res.status(200).json({ 
            success : true,
            data : data
         })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.getCategoryById = async (req, res, next) => {
    try {
        const data = await db.Category.findByPk(req.params.id);
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ data })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.deleteCategoryById = async (req, res, next) => {
    try {
        const removedata = await db.Category.destroy({ where: { id: req.params.id } })
        if (removedata === 0) {
            return res.status(400).json({
                message: `Category with that id =${req.params.id} is not present`,
            })
        }
        return res.status(200).json({
            status: "Category deleted Successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Failed",
            err: err
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const data = await db.Category.update({
            categoryName: req.body.categoryName,
            isActive : req.body.isActive
        }, { where: { id: req.params.id } })
        if (data.includes(0)) {
            return res.status(400).json({
                message: `Category with that id =${req.params.id} is not present`,
            })
        }
        return res.status(200).json({
            success : true,
            message: "Category updated successfully",
            data: data
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            err: err.errors[0].message
        })
    }
}

