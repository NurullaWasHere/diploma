const {Router} = require('express')
const {    
    createQuestion, getAllQuestions, answerQuestion, deleteQuestion
} = require('../controllers/QuestionController')

const router = new Router();

router.get('/getAllQuestions', getAllQuestions)

router.post('/createQuestion', createQuestion)

router.put('/answerQuestion',answerQuestion)

router.delete('/deleteQuestion', deleteQuestion)


module.exports = router



