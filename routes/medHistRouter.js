const {Router} = require('express')
const {    
    createMedicineHistoryToUser, deleteMedicineHistory, getAllMedicineHistoryUser
} = require('../controllers/medicineHistory')

const router = new Router();

router.get('/getAllMedicineHistoryUser/:userId', getAllMedicineHistoryUser)

router.post('/createMedicineHistoryToUser', createMedicineHistoryToUser)

router.delete('/deleteMedicineHistory', deleteMedicineHistory)


module.exports = router



