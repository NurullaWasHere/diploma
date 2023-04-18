const {questions, BlogModel, departmentModel} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')


// validation, question-solution one-to-many

const createDepartment  = async (req,res) => {
    try {
        const params = req.body
        const {phone} = params

        const isExist = await departmentModel.findOne({where: {phone}})

        if(isExist){
            return res.json({
                message: "Department already exist",
                code: 400
            })
        }
    
        const newDepartment = await departmentModel.create({
            ...params
        })

        return res.json({
            message: "Department created!",
            code: 200,
            newDepartment
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllDepartments = async (req,res) => {
    try {
        const blogs = await departmentModel.findAll();
        return res.json(
            {
                blogs,
                code: 200
            }
        )
    } catch (error) {
        console.log(error)
    }
}


const deleteDepartment = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await departmentModel.findOne({
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

        await departmentModel.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "Blog deleted", 
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

const getDepartment = async (req,res) => {
    try {
        const {id} = req.body
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const blog = await departmentModel.findOne({
            where: params
        })
        if(!blog){
            return res.json({
                message: "department doesn't found",
                code: 404
            })
        }

        return res.json({
            code:200,
            blog
        })

    } catch (error) {
        console.log(error)
    }
}

const updateDepartment = async (req,res) => {
    try {
        const params = req.body;
        const {id} = req.body
        const isExist = await departmentModel.findOne({
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
        const newBlog = await departmentModel.update({
            ...params
        }, {
            where: {
                id
            }
        })
        return res.json({
            code:200,
            newBlog
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createDepartment, getAllDepartments, deleteDepartment, getDepartment, updateDepartment
}