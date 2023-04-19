const {questions, BlogModel, sign, service, EmployerModel, medicineHistory} = require('../sequelize/models')
const {validationResult, param} = require('express-validator')
const isExist = require('../utils/isExist')


// validation, question-solution one-to-many

const createMedicineHistoryToUser  = async (req,res) => {
    try {
        const {user_id, phone, createdAt, service_id, employerId} = req.body
        let description = "Запись к "

        const isExist = await medicineHistory.findOne({
            where: {
                createdAt
            }
        })
        
        if(isExist){
            return res.json({
                message: "History already exist",
                code: 400
            })
        }

        if(service_id){
            const dService = await service.findOne({
                where: {
                    id: service_id
                }
            })
            
            description = description + " " + dService.name + " по цене " + dService.price + " в" + createdAt.toString();
        }

        if(employerId){
            const dEmp = await EmployerModel.findOne({
                where: {
                    id: employerId
                }
            })
            
            description = description + " " + dEmp.firstname + " " + dEmp.lastnamae + " в" + createdAt.toString();
        }
    
        const newMedicineHistory = await medicineHistory.create({
            description,

        })

        return res.json({
            message: "Blog created!",
            code: 200,
            newMedicineHistory
        })
    } catch (error) {
        console.log(error)
    }    
}

const getAllMedicineHistoryUser = async (req,res) => {
    try {
        if(!req.params.userId){
            return res.json({
                message: "Required id",
                code: 400
            })
        }
        const histories = await medicineHistory.findAll({where: {
            user_id:req.params.userId
        }});
        return res.json(
            {
                histories,
                code: 200
            }
        )
    } catch (error) {
        console.log(error)
    }
}


const deleteMedicineHistory = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) {
           return res.json({
               message: "id required", 
               code: 400
           })
        }
   
        const isExist = await medicineHistory.findOne({
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

        await medicineHistory.destroy({
            where:{
                id
            }
        }).then( () => {
            return res.json({
                message: "history deleted", 
                code:200
            })
        }).catch( () => {
            return res.json({
                message: "history deleted failed!", 
                code:400
            })
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createMedicineHistoryToUser, deleteMedicineHistory, getAllMedicineHistoryUser
}**
