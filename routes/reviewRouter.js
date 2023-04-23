const {Router} = require('express')
const {    
    createReviewToBlog, createReviewToEmployer, deleteReview, updateReview, getReviewOfBlog, getReviewOfEmployer
} = require('../controllers/ReviewController')

const router = new Router();

router.get('/getReviewOfBlog/:blogId', getReviewOfBlog)
router.get('/getReviewOfEmployer/:employerId', getReviewOfEmployer)


router.post('/createReviewToBlog', createReviewToBlog)
router.post('/createReviewToEmployer', createReviewToEmployer)

router.put('/updateReview',updateReview)

router.delete('/deleteReview', deleteReview)


module.exports = router



