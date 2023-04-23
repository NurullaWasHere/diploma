const {questions, BlogModel, review, EmployerModel} = require('../sequelize/models')
const {validationResult} = require('express-validator')
const isExist = require('../utils/isExist')


// validation, question-solution one-to-many

const getReviewOfBlog = async (req,res) => {
    try {
        const { blogId } = req.params

        if(!blogId){
            return res.json({
                message: "id required",
                code:400
            })
        }
        const blogs = await BlogModel.findAll( {
            where: {
                blogId
            }
        })

        return res.json({
            blogs
        })


    } catch (error) {
        console.log(error)
    }
}

const getReviewOfEmployer = async (req,res) => {
    try {
        const { employerId } = req.params

        if(!blogId){
            return res.json({
                message: "id required",
                code:400
            })
        }
        const blogs = await BlogModel.findAll( {
            where: {
                employerId
            }
        })

        return res.json({
            blogs
        })


    } catch (error) {
        console.log(error)
    }
}


const createReviewToBlog  = async (req,res) => {
    try {
        const {blogId} = req.body;

        const author_id = req.user.id

        const isExist = await BlogModel.findOne({
            where: {
                blogId
            }
        })

        if(!isExist){
            return res.json({
                message: "Blog doesn't exist",
                code: 400
            })
        }
        
        const blog = await BlogModel.findOne({
            where: {
                id: blogId
            }
        })
        const newReview = await review.create({
            author_id,
            description: req.body.description
        })

        await blog.addReview(newReview).then( () => {
            return res.json({
                message:"review added",
                code: 200
            })
        })
    } catch (error) {
        console.log(error)
    }    
}

const createReviewToEmployer  = async (req,res) => {
    try {
        const {employerId} = req.body;

        const author_id = req.user.id


        const isExist = await EmployerModel.findOne({
            where: {
                id: employerId
            }
        })

        if(!isExist){
            return res.json({
                message: "Employer doesn't exist",
                code: 400
            })
        }
        

        const newReview = await review.create({
            author_id,
            description: req.body.description
        })

        await isExist.addReview(newReview).then( () => {
            return res.json({
                message:"review added",
                code: 200
            })
        })
    } catch (error) {
        console.log(error)
    }    
}


const deleteReview = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await review.findOne( {
            where : {
                id
            }
        })

        if(!isExist){
           return res.json({
               message: "doesn't exist", 
               code: 400
           })
        }   
        await review.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "user deleted", 
                code:200
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const updateReview = async (req,res) => {
    try {
        const {id, description, author_id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
        const isExist = await review.findOne( {
            where : {
                id
            }
        })

        if(!isExist){
           return res.json({
               message: "doesn't exist", 
               code: 400
           })
        }   

        if( req.user.id !== author_id && !(await EmployerModel.findOne({where: {id: req.user.id}}))){
            return res.json({
                message: "No access"
            })
        } 

        await review.update({
            description
        },
        {where: {
            id
        }})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createReviewToBlog, createReviewToEmployer, deleteReview, updateReview, getReviewOfEmployer, getReviewOfBlog
}