


const {UserModel} = require('../sequelize/models')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

require('dotenv').config()

const registration = async (req,res) => {
    try {
    
        const allowed = validationResult(req);
        if(!allowed.isEmpty){
            return res.json({
                message: "Validation is not passed",
                code: 400
            })
        }

        const {IIN} = req.body;
        const isExist = await UserModel.findOne({where: {IIN}})
        if(isExist){
            return res.json({
                message: "Пользватель уже существует"
            })
        }
        const user = await UserModel.create(req.body);
        res.json({
            message: "Пользватель успешно создан!",
            user,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Ошибка при созданий пользвателя", 
            error
        })
    }   
}



const loginUser = async (req,res) => {
    try {
        const {IIN} = req.body;
        if(!IIN){
            return res.json({
                message: "IIN required"
            })
        }
        const user = await UserModel.findOne({
            where: {iin: IIN}
        })
        
        if(!user){
            return res.json({message: "Пользватель не найден!", code: 404})
        }
        if(req.body.password !== user.password){
            return res.json({message: "Неверный пароль"})
        }
        const token = jwt.sign({
            id: user.id
        },
        process.env.SECRET_KEY,
        {expiresIn: '1000h'});
        return res.json({
            token,
            user
        });
    } catch (error) {
        console.log('Ошибка с логином', error);
    }
}


const deleteUser = async (req,res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.json({
                message:"Нужно указать id"
            })
            }
        await UserModel.destroy({
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

const getAllUsers = async ( _ ,res) => {
    try {
        const users = await UserModel.findAll();
        if(!users){
            return res.json({
                message: "В базе данных не пользвателей"
            })
        }
        res.send(users)
    } catch (error) {
        res.json({
            message:"Ошибка при getAllUsers",
            error
        })
    }
}

module.exports = {
    loginUser, 
    registration,
    deleteUser,
    getAllUsers
}