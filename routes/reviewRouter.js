const {Router} = require('express')
const {    
    createReviewToBlog, createReviewToEmployer, deleteReview, updateReview
} = require('../controllers/ReviewController')

const router = new Router();


router.post('/createReviewToBlog', createReviewToBlog)
router.post('/createReviewToEmployer', createReviewToEmployer)

router.put('/updateReview',updateReview)

router.delete('/deleteReview', deleteReview)


module.exports = router



