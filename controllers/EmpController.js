


const {UserModel,  EmployerModel,  Certification} = require('../sequelize/models')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

require('dotenv').config()

const createEmp = async (req,res) => {
    try {
        const params = req.body;

        const isExist = await EmployerModel.findOne({where: {phone: params.phone}})
        if(isExist){
            return res.json({
                message: "Работник уже существует"
            })
        }

        const emp = await EmployerModel.create(params);
        return res.json({
            message: "Работник успешно создан!",
            emp,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Ошибка при созданий работника", 
            error
        })
    }   
}



const loginEmp = async (req,res) => {
    try {
        const params = req.body;


        const emp = await EmployerModel.findOne({
            where: {phone: params.phone}
        })

        if(!emp){
            return res.json({message: "Работник не найден!"})
        }
        if(params.password !== emp.password){
            return res.json({message: "Неверный пароль"})
        }
        const token = jwt.sign({
            id: emp.id
        },
        process.env.SECRET_KEY,
        {expiresIn: '1000h'});
        return res.json({
            token,
            emp
        });
    } catch (error) {
        console.log('Ошибка с логином работника', error);
    }
}


const deleteEmp = async (req,res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.json({
                message:"Нужно указать id"
            })
            }

        await EmployerModel.destroy({
            where: {
                id
            }
        })
    } catch (error) {
        res.json({
            message: "Ошибка при удалений пользвателя",
            error
        })
    }
}

const getAllEmployers = async ( req ,res) => {
    try {
        const employers = await EmployerModel.findAll();

        if(!employers){
            return res.json({
                message: "В базе данных нет работников"
            })
        }
        return res.json( {
            employers,
            code: 200
        })
    } catch (error) {
        res.json({
            message:"Ошибка при getAllEmployers",
            error
        })
    }
}

const getEmployer = async (req,res) => {
    try {
        const emp = await EmployerModel.findOne({
            where: {
                id:req.params.id
            }
        })
        if(!emp){
            return res.json({
                message:"employer doesn't exist",
                code:400
            })
        }
        const empCertifications = await emp.getCertifications();

        return res.json({
            emp,
            empCertifications
        })
    } catch (error) {
        res.json({
            message:"Ошибка при getAllUsers",
            error
        })
    }
}

module.exports = {
    createEmp,
    loginEmp,
    deleteEmp,
    getAllEmployers,
    getEmployer
}