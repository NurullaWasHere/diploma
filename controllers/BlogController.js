const {questions, BlogModel} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')


// validation, question-solution one-to-many

const createBlog  = async (req,res) => {
    try {
        const params = req.body
        params.author_id = req.user.id
        const {name} = params

        const isExist = await BlogModel.findOne({where: {name}})

        if(isExist){
            return res.json({
                message: "Blog already exist",
                code: 400
            })
        }
    
        const newBlog = await BlogModel.create({
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

const getAllBlogs = async (req,res) => {
    try {
        const blogs = await BlogModel.findAll();
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


const deleteBlog = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await BlogModel.findOne({
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

        await BlogModel.destroy({
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

const getBlogByParams = async (req,res) => {
    try {
        const {params} = req.body
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const blog = await BlogModel.findOne({
            where: params
        })
        if(!blog){
            return res.json({
                message: "blog doesn't found",
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

const updateBlog = async (req,res) => {
    try {
        const params = req.body;
        const {id} = req.body
        const isExist = await BlogModel.findOne({
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
        const newBlog = await BlogModel.update({
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
    createBlog, getAllBlogs, deleteBlog, getBlogByParams, updateBlog
}