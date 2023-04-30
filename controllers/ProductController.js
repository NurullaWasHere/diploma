const {questions, Product} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')


// validation, question-solution one-to-many

const createProduct  = async (req,res) => {
    try {
        const params = req.body
        const {serial_number} = params

        const isExist = await Product.findOne({where: {serial_number}})

        if(isExist){
            return res.json({
                message: "Blog already exist",
                code: 400
            })
        }
    
        const newBlog = await Product.create({
            ...params
        })

        return res.json({
            message: "Blog created!",
            code: 200,
            newBlog
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllProducts = async (req,res) => {
    try {
        const blogs = await Product.findAll();
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


const deleteProduct = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await Product.findOne({
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

        await Product.destroy({
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

const getProductByParams = async (req,res) => {
    try {
        const {id} = req.params
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const blog = await Product.findOne({
            where: {id}
        })
        if(!blog){
            return res.json({
                message: "Product doesn't found",
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

const updateProduct = async (req,res) => {
    try {
        const params = req.body;
        const {id} = req.body
        const isExist = await Product.findOne({
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
        const newBlog = await Product.update({
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
    createProduct, getAllProducts, deleteProduct, getProductByParams, updateProduct
}