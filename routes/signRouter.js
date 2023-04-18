const {Router} = require('express')
const {    
    signsByDoctor, deleteSign, signToService, signToDoctor, signByPhone, signsByService
} = require('../controllers/SignController')

const router = new Router();

router.get('/signsByDoctor', signsByDoctor)
router.get('/signsByService', signsByService)

router.post('/signToService', signToService)
router.post('/signToDoctor', signToDoctor)
router.post('/signByPhone', signByPhone)

router.delete('/deleteSign', deleteSign)


module.exports = router



