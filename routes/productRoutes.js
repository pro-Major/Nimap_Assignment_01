const express = require('express')
const router = express.Router()
const {createProduct,getProduct,getProductById,deleteProductById,UpdateProductById} = require('../controllers/productController')


router.post('/create',createProduct)
router.get('/',getProduct)
router.get('/:id',getProductById)
router.patch('/:id',UpdateProductById)
router.delete('/:id',deleteProductById)




module.exports = router;