const {Router} = require('express')
const {    
    createSign, getAmountOfPages, getAllSignsEmployer,getEmptySignsOfService, getSignsOfService,signsByDoctor, deleteSign, signByPhone, signsByService, getEmptySignsOfEmployer, getSignsOfEmployer, signToExistingDate, createSignToDoctor, createSignToService, getSignsSortedByDate
} = require('../controllers/SignController');
const authMiddleware = require('../utils/authMiddleware');

const router = new Router();

router.get('/signsByDoctor', signsByDoctor)
router.get('/signsByService', signsByService)
router.get('/getSignsOfService', getSignsOfService)
router.get('/getAllSignsEmployer/:id', getAllSignsEmployer)
router.get('/getSignsSortedByDate/:page?', getSignsSortedByDate)
router.get('/getAmountOfPages', getAmountOfPages)

router.post('/getEmptySignsOfEmployer', getEmptySignsOfEmployer)
router.post('/getEmptySignsOfService', getEmptySignsOfService)
router.post('/createSign', createSign)
router.get('/getSignsOfService', getSignsOfEmployer)

router.post('/signToExistingDate',authMiddleware,signToExistingDate)
router.post('/createSignToDoctor', createSignToDoctor)
router.post('/createSignToService', createSignToService)

router.post('/signByPhone', signByPhone)

router.post('/deleteSign', deleteSign)


module.exports = router



