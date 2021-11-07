const express = require('express')
const router = express.Router()
const {createCategory,getCategory,getCategoryById,deleteCategoryById,updateCategory} = require('../controllers/categoryController')


router.post('/create',createCategory)
router.get('/',getCategory)
router.get('/:id',getCategoryById)
router.delete('/:id',deleteCategoryById)
router.patch('/:id',updateCategory)


module.exports = router;