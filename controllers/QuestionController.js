const {questions} = require('../sequelize/models')
const {validationResult} = require('express-validator')


// validation, question-solution one-to-many

const createQuestion  = async (req,res) => {
    try {
        const {name} = req.body;

        const isExist = await questions.findOne({
            where: {
                name
            }
        })
        if(!isExist){
           return res.json({
               message: "doesn't exist", 
               code: 400
           })
        }   
    
        const newQuestion = await questions.create({
            ...req.body
        })

        return res.json({
            message: "question created!",
            code: 200
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllQuestions = async (req,res) => {
    try {
        const questions = await questions.findAll();
        return res.json(
            {
                questions,
                code: 200
            }
        )
    } catch (error) {
        console.log(error)
    }
}


const deleteQuestion = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await questions.findOne({
            where: {
                id
            }
        })
        if(!isExist){
           return res.json({
               message: "doesn't exist", 
               code: 400
           })
        }      

        await questions.destroy({
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

const answerQuestion = async (req,res) => {
    try {
        const {id, solution} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await questions.findOne({
            where: {
                id
            }
        })
        if(!isExist){
           return res.json({
               message: "doesn't exist", 
               code: 400
           })
        }   

        await questions.update({
            solution,
        },
        {where: {
            id
        }})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createQuestion, getAllQuestions, answerQuestion, deleteQuestion
}