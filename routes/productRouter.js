const {Router} = require('express')
const {    
    createProduct, getAllProducts, deleteProduct, getProductByParams, updateProduct
} = require('../controllers/ProductController')
const authMiddleware = require('../utils/authMiddleware')


const router = new Router();

router.get('/getAllProducts', getAllProducts)
router.get('/getProductByParams/:id', getProductByParams)

router.post('/createProduct',createProduct)

router.put('/updateProduct',updateProduct)

router.delete('/deleteProduct',deleteProduct)


module.exports = router



