const {Router} = require('express')
const {    
    createBlog, getAllBlogs, deleteBlog, getBlogByParams, updateBlog
} = require('../controllers/BlogController')
const authMiddleware = require('../utils/authMiddleware')


const router = new Router();

router.get('/getAllBlogs', getAllBlogs)
router.get('/getBlogByParams/:id', getBlogByParams)

router.post('/createBlog',authMiddleware,createBlog)

router.put('/updateBlog',authMiddleware,updateBlog)

router.delete('/deleteBlog',authMiddleware,deleteBlog)


module.exports = router



