const {Router} = require('express')
const {    
    loginUser, 
    registration,
    deleteUser,
    getAllUsers,
    getUser
} = require('../controllers/UserController')

const router = new Router();

router.get('/users', getAllUsers)
router.get('/user/:id', getUser)
router.post('/login', loginUser)
router.post('/registration', registration)
router.delete('/deleteUser', deleteUser)


module.exports = router



