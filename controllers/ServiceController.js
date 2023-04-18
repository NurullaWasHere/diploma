const {questions, BlogModel, service} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')
const {Op} = require('sequelize')


// validation, question-solution one-to-many

const createService  = async (req,res) => {
    try {
        const params = req.body
        const {name} = params

        const isExist = await service.findOne({
            where: {
                name
            }
        })

        if(isExist){
            return res.json({
                message: "Service already exist",
                code: 400
            })
        }
    
        const newService = await BlogModel.create({
            ...params
        })

        return res.json({
            message: "Blog created!",
            code: 200,
            newService
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllService = async (req,res) => {
    try {
        const services = await service.findAll();
        return res.json(
            {
                services,
                code: 200
            }
        )
    } catch (error) {
        console.log(error)
    }
}


const deleteService = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await service.findOne({
            where: {
                id
            }
        })
        if(!isExist){
           return res.json({
               message: "Service doesn't exist", 
               code: 400
           })
        }   

        await service.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "Service deleted", 
                code:200
            })
        }).catch( () => {
            return res.json({
                message: "Blog deleted failed!", 
                code:400
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const getServicesWithDiscount = async (req,res) => {
    try {

        const services = await BlogModel.findAll({
            where: {
                discount: {
                    [Op.gte]: 1
                }
            }
        })
        return res.json({
            code:200,
            services
        })

    } catch (error) {
        console.log(error)
    }
}

const updateService = async (req,res) => {
    try {
        const params = req.body;
        const isExist = await service.findOne({
            where: {
                id
            }
        })
        if(!isExist){
           return res.json({
               message: "Service doesn't exist", 
               code: 400
           })
        }   
        const newService = await BlogModel.update({
            ...params
        }, {
            where: {
                id
            }
        })
        return res.json({
            code:200,
            newService
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    updateService, getServicesWithDiscount, deleteService, getAllService, createService
}