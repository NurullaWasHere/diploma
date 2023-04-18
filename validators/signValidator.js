const {check, validationResult} = require('express-validator')

const signValidate = [
    check('phone', 'Unvalid email').isMobilePhone().exists(),
    check('firstname', 'firstname needs more than 4 characters').isLength({min: 4}),
    check('lastname', 'lastname needs more than 4 characters').isLength({min: 4}),
]


const signValidateResult = (req,res,next) => {

    const allowed = validationResult(req);
    if(!allowed.isEmpty){
        return res.json({
            message: "Validation is not passed",
            code: 400
        })
    }

    next();

}

module.exports = {signValidate, signValidateResult}