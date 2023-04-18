const {check} = require('express-validator')

const jobs = [
    'doctor',
    'dentist',
    'owner',
    'consultant'
]


const empValidate = [
    check('job', 'job field required and has to be string').exists().isString(),
    check('email', 'Unvalid email').isEmail(),
    check('password', 'Password required').exists(),
    check('phone', 'Unvalid phone').isMobilePhone(),
    check('firstname', 'firstname needs more than 4 characters').isLength({min: 4}),
    check('lastname', 'lastname needs more than 4 characters').isLength({min: 4}),
]


const empValidator = (res,req,next) => {
    const job = req.body;

    const allowed = validationResult(req);
    if(!allowed.isEmpty){
        return res.json({
            message: "Validation is not passed",
            code: 400
        })
    }

    if(!jobs.includes(job.trim())){
        return res.json({
            message: "Unvalid job",
            code: 400
        })
    }

    next()
}


module.exports = {empValidate, empValidator}