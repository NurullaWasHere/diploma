const {Ware} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')


// validation, question-solution one-to-many

const createWare  = async (req,res) => {
    try {
        const params = req.body
        const {name} = params

        const isExist = await Ware.findOne({where: {name}})

        if(isExist){
            return res.json({
                message: "Ware already exist",
                code: 400
            })
        }
    
        const newWare = await Ware.create({
            ...params
        })

        return res.json({
            message: "Ware created!",
            code: 200,
            newWare
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllWares = async (req,res) => {
    try {
        const wares = await Ware.findAll();
        return res.json(
            {
                wares,
                code: 200
            }
        )
    } catch (error) {
        console.log(error)
    }
}


const deleteWare = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await Ware.findOne({
            where: {
                id
            }
        })

        if(!isExist){
           return res.json({
               message: "Blog doesn't exist", 
               code: 400
           })
        }   

        await Ware.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "Ware deleted", 
                code:200
            })
        }).catch( () => {
            return res.json({
                message: "Ware deleted failed!", 
                code:400
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const getWare = async (req,res) => {
    try {
        const {id} = req.params
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const ware = await Ware.findOne({
            where: {id}
        })
        if(!ware){
            return res.json({
                message: "ware doesn't found",
                code: 404
            })
        }

        return res.json({
            code:200,
            ware
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getWare, deleteWare, getAllWares, createWare
}