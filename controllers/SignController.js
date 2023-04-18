const {sign, EmployerModel, UserModel, medicineHistory, service} = require('../sequelize/models')
const {validationResult} = require('express-validator')
const isExist = require('../utils/isExist')




const signToService  = async (req,res) => {
    try {
        const {service_id} = req.body;
        const {user_id, phone} = req.user

        const signExist = await sign.findOne({
            where: {
                user_id,
                service_id
            }
        })

        if(signExist){
            return res.json({
                message: "Sign already signed",
                code:400
            })
        }
        const newSign = await sign.create({
            description: req.body.description,
            service_id,
            user_id,
            phone
        })

        return res.json({
            message: "question created!",
            code: 200,
            newSign
        })
    } catch (error) {
        console.log(error)
    }    
}


const signToDoctor = async (req,res) => {
    try {
        const {employerId} = req.body;
        const {user_id,phone} = req.user
        const emp = await EmployerModel.findOne({
            where: {
                id: employerId
            }
        })

        if(!emp){
            return res.json({
                message: "emp doesn't exist",
                code: 400
            })
        }
        const signExist = await sign.findOne({
            where: {
                user_id,
                employerId
            }
        })
        if(signExist){
            return res.json({
                message: "Sign already signed",
                code:400
            })
        }
        const newSign = await emp.addSign( await sign.create({
            user_id,
            description: req.body.description,
            phone
        }))

        return res.json({
            message: "question created!",
            code: 200,
            newSign
        })
    } catch (error) {
        console.log(error)
    }    
}


const signByPhone = async( req,res ) => {
    try {
        const {phone, description} = req.body;
        if(!phone) {
           return res.json({
               message: "phone required", 
               code: 400
           })
        }
   
        const isExist = await sign.findOne({
            where: {
                phone
            }
        })
        if(!isExist){
           return res.json({
               message: "sign doesn't exist", 
               code: 400
           })
        }   

        const newSign = await sign.create({
            phone, 
            description
        })
        return res.json({
            newSign

        })
    } catch (error) {
        console.log(error)
    }
}

const deleteSign = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await sign.findOne({
            where: {
                id
            }
        })
        if(!isExist){
           return res.json({
               message: "sign doesn't exist", 
               code: 400
           })
        }   
  
        await sign.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "sign deleted", 
                code:200
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const signsByDoctor = async (req,res) => {
    try {
        const {employerId} = req.body;
        if(!employerId) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const isExist = await sign.findOne({
            where: {
                id: employerId
            }
        })
        if(!isExist){
           return res.json({
               message: "sign doesn't exist", 
               code: 400
           })
        }   
 
        const empSigns = await sign.findAll({
            employerId
        })


        return res.json({
            empSigns,
            code: 200
        })
    } catch (error) {
        console.log(error)
    }
}

const signsByService = async (req,res) => {
    try {
        const {service_id} = req.body;
        if(!service_id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const services = await sign.findAll({where: {service_id}})

        if(!services){
            return res.json({
                message: "no signs to this service"
            })
        }

        return res.json({
            services,
            code: 200
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    signsByDoctor, deleteSign, signToService, signToDoctor, signByPhone, signsByService
}