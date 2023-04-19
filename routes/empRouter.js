const {Router} = require('express')
require("dotenv").config()
const {    
    createEmp,
    loginEmp,
    deleteEmp,
    getAllEmployers,
    getEmployer
} = require('../controllers/EmpController')

const router = new Router();

router.get('/getAllEmployers', getAllEmployers)
router.get('/getEmployer/:id', getEmployer)

router.post('/createEmp', createEmp)
router.post('/loginEmp', loginEmp)

router.delete('/deleteEmp', deleteEmp)


module.exports = router



