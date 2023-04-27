const {Router} = require('express')
const {    
    updateService, getServicesWithDiscount, deleteService, getAllService, createService, getService
} = require('../controllers/ServiceController')

const router = new Router();

router.get('/getAllService', getAllService)
router.get('/getService/:id', getService)
router.get('/getServicesWithDiscount', getServicesWithDiscount)

router.post('/createService', createService)

router.put('/updateService',updateService)

router.delete('/deleteService', deleteService)


module.exports = router



