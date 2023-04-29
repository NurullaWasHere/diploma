const {Router} = require('express')
const {    
    getAllSignsEmployer,getEmptySignsOfService, getSignsOfService,signsByDoctor, deleteSign, signByPhone, signsByService, getEmptySignsOfEmployer, getSignsOfEmployer, signToExistingDate, createSignToDoctor, createSignToService, getSignsSortedByDate
} = require('../controllers/SignController');
const authMiddleware = require('../utils/authMiddleware');

const router = new Router();

router.get('/signsByDoctor', signsByDoctor)
router.get('/signsByService', signsByService)
router.get('/getSignsOfService', getSignsOfService)
router.get('/getAllSignsEmployer/:id', getAllSignsEmployer)
router.get('/getSignsSortedByDate/:page?', getSignsSortedByDate)

router.post('/getEmptySignsOfEmployer', getEmptySignsOfEmployer)
router.post('/getEmptySignsOfService', getEmptySignsOfService)
router.get('/getSignsOfService', getSignsOfEmployer)

router.post('/signToExistingDate',authMiddleware,signToExistingDate)
router.post('/createSignToDoctor', createSignToDoctor)
router.post('/createSignToService', createSignToService)

router.post('/signByPhone', signByPhone)

router.delete('/deleteSign', deleteSign)


module.exports = router



