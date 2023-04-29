const {sign, EmployerModel, UserModel, medicineHistory, service} = require('../sequelize/models')
const {validationResult} = require('express-validator')
const isExist = require('../utils/isExist')
const {Op, fn, col, literal} = require('sequelize')



const createSignToService = async (req,res) => {
    try {
        const {service_id, signDate} = req.body;
        const emp = await service.findOne({
            where: {
                id: service_id
            }
        })

        if(!emp){
            return res.json({
                message: "service doesn't exist",
                code: 400
            })
        }
        const signExist = await sign.findOne({
            where: {
                service_id,
                signDate: signDate
            }
        })
        if(signExist){
            return res.json({
                message: "Sign already signed",
                code:400
            })
        }
        const newSign =  await sign.create({
            signDate,
            description: req.body.description,
            service_id
        })

        return res.json({
            message: "sign created!",
            code: 200,
            newSign
        })
    } catch (error) {
        console.log(error)
    }    
}

const getSignsSortedByDate = async (req,res) => {
    try {
        const tzOffset = '+03:00'
        const {page} = req.params
        const limit = 1
        const offset = (page - 1) * limit;
        const result = await sign.findAll({
            attributes: [
                [fn('DATE', col('signDate')), 'signDate'], 
                [fn('array_agg', fn('json_build_object', 'signDate', literal(`("sign"."signDate" AT TIME ZONE 'UTC' AT TIME ZONE '${tzOffset}')`), 'user_id', col('user_id'))), 'user_ids']
            ],
            group: [fn('DATE', col('signDate'))],
            order: [col('signDate')],
            limit: limit,
            offset: offset
        })

        return res.json({
            result
        })
    
    } catch (error) {
        console.log(error)
    }
}


const getSignsOfService = async (req,res) => {
    try {
        const {service_id} = req.body;
        if(!service_id){
            return res.json({
                message: "service id required",
                code: 400
            })
        }

        const signs = await sign.findAll( {
            where: {
                service_id,
                user_id: {
                    [Op.not]: null
                }
            }
        })

        return res.json( {
            signs
        })
    } catch (error) {
        console.log(error)
    }
}


const getEmptySignsOfService = async (req,res) => {
    try {
        const {service_id, date} = req.body;

        if(!service_id){
            return res.json({
                message: "service_id required",
                code: 400
            })
        }
        const findSigns = await sign.findAll( {
            where: {
                service_id,
                user_id: {
                    [Op.eq] : null
                }
            },
            order: [
                ['signDate', 'ASC']
            ],
        })
        const signs = findSigns.filter( el => el.signDate.toLocaleDateString() == date)
        return res.json( {
            signs
        })
    } catch (error) {
        console.log(error)
    }
}


const createSignToDoctor = async (req,res) => {
    try {
        const {employerId, signDate} = req.body;
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
                employerId,
                signDate: signDate
            }
        })
        if(signExist){
            return res.json({
                message: "Sign already signed",
                code:400
            })
        }
        const newSign = await emp.addSign( await sign.create({
            signDate,
            description: req.body.description
        }))

        return res.json({
            message: "sign created!",
            code: 200,
            newSign
        })
    } catch (error) {
        console.log(error)
    }    
}

const signToExistingDate = async (req,res) => {
    try {
        const {id} = req.body;
        const isExist = await sign.findOne( {
            where: {
                id
            }
        })
        if(!isExist){
            return res.json( {
                message: "sign doesn't exist",
                code: 400
            })
        }
        const user_id = req.user.id;
        const updated = await sign.update( {
            user_id
        },
        {
            where: {
                id
            }
        })
        return res.json({
            message: "sign updated!",
            code: 200,
            updated
        })
}
catch (error) {
    console.log(error)
}
}

const getSignsOfEmployer = async (req,res) => {
    try{
        const {employerId} = req.body;
        if(!employerId){
            return res.json({
                message: "employerId required",
                code: 400
            })
        }

        const signs = await sign.findAll( {
            where: {
                employerId,
                user_id: {
                    [Op.not]: null
                }
            }
        })

        return res.json( {
            signs
        })
    }catch (error) {
        console.log(error)
    }
}


const getAllSignsEmployer = async (req,res) => {
    try{
        const {employerId} = req.params;
        if(!employerId){
            return res.json({
                message: "employerId required",
                code: 400
            })
        }

        const signs = await sign.findAll( {
            where: {
                employerId,
                user_id: {
                    [Op.eq] : null
                }
            }
        })

        const filteredSigns = signs.map ( el =>  {
            return el.signDate.toLocaleDateString()
        })

        return res.json( {
            filteredSigns
        })
    }catch (error) {
        console.log(error)
    }
}



const getEmptySignsOfEmployer = async (req,res) => {
    try {
        const {employerId, date} = req.body;


        if(!employerId){
            return res.json({
                message: "employerId required",
                code: 400
            })
        }
        const findSigns = await sign.findAll( {
            where: {
                employerId,
                user_id: {
                    [Op.eq] : null
                }
            },
        })
        const signs = findSigns.filter( el => el.signDate.toLocaleDateString() == date)
        return res.json( {
            signs
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

const getSignByDate = async (req,res) => {
    try {
        const date = req.params.date
        const signsInDate = await sign.findAll()
    

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getSignsSortedByDate, getAllSignsEmployer,getEmptySignsOfService, getSignsOfService,signsByDoctor, deleteSign, signByPhone, signsByService, getEmptySignsOfEmployer, getSignsOfEmployer, signToExistingDate, createSignToDoctor, createSignToService
}