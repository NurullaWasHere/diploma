const {Router} = require('express')
const {    
    loginUser, 
    registration,
    deleteUser,
    getAllUsers
} = require('../controllers/UserController')

const router = new Router();

router.get('/users', getAllUsers)
router.post('/login', loginUser)
router.post('/registration', registration)
router.delete('/deleteUser', deleteUser)


module.exports = router



