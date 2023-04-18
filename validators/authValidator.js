const {check, validationResult} = require('express-validator')

const authValidate = [
    check('email', 'Unvalid email').isEmail(),
    check('password', 'Password required').exists(),
    check('phone', 'Unvalid phone').isMobilePhone(),
    check('firstname', 'firstname needs more than 4 characters').isLength({min: 4}),
    check('lastname', 'lastname needs more than 4 characters').isLength({min: 4}),
]


const authValidateResult = (req,res,next) => {
    const allowed = validationResult(req);
    if(!allowed.isEmpty){
        return res.json({
            message: "Validation is not passed",
            code: 400
        })
    }

    next();

}


module.exports ={authValidate, authValidateResult}