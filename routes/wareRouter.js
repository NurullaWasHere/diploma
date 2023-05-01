const {Router} = require('express')
const {    
    getAllWares, getWare, createWare, deleteWare
} = require('../controllers/WareController')
const authMiddleware = require('../utils/authMiddleware')


const router = new Router();

router.get('/getAllWares', getAllWares)
router.get('/getWare/:id', getWare)

router.post('/createWare',createWare)

router.delete('/deleteWare',deleteWare)


module.exports = router



