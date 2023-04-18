const {Router} = require('express')
const {    
    createDepartment, getAllDepartments, deleteDepartment, getDepartment, updateDepartment
} = require('../controllers/departmentController')
const authMiddleware = require('../utils/authMiddleware')


const router = new Router();

router.get('/getAllDepartments', getAllDepartments)
router.get('/getDepartment', getDepartment)

router.post('/createDepartment',createDepartment)

router.put('/updateDepartment',updateDepartment)

router.delete('/deleteDepartment',deleteDepartment)


module.exports = router



