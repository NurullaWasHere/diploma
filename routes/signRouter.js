const {Router} = require('express')
const {    
    getEmptySignsOfService, getSignsOfService,signsByDoctor, deleteSign, signByPhone, signsByService, getEmptySignsOfEmployer, getSignsOfEmployer, signToExistingDate, createSignToDoctor, createSignToService
} = require('../controllers/SignController')

const router = new Router();

router.get('/signsByDoctor', signsByDoctor)
router.get('/signsByService', signsByService)
router.get('/getEmptySignsOfService', getEmptySignsOfService)
router.get('/getSignsOfService', getSignsOfService)
router.get('/getEmptySignsOfService', getEmptySignsOfEmployer)
router.get('/getSignsOfService', getSignsOfEmployer)

router.post('/signToExistingDate', signToExistingDate)
router.post('/createSignToDoctor', createSignToDoctor)
router.post('/createSignToService', createSignToService)

router.post('/signByPhone', signByPhone)

router.delete('/deleteSign', deleteSign)


module.exports = router



