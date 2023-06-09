const {DataTypes} = require('sequelize')
const sequelize = require('./db')

const departmentModel = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    work_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const UserModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IIN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

})

const BlogModel = sequelize.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const EmployerModel = sequelize.define('employer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    job:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const medicineHistory = sequelize.define("historymed", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    med_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

const paymentHistory = sequelize.define("historypay", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    total:{
        type :DataTypes.INTEGER,
        allowNull: false
    }
})


const Ware = sequelize.define("Ware", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    name:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    serial_number:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    name:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})



const sign = sequelize.define('sign', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:true
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull:true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    signDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const issues = sequelize.define('issues', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
})

const review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    author_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const service = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    discount: {
        type:DataTypes.INTEGER,
        allowNull:true
    },
    service_image: {
        type: DataTypes.STRING,
        allowNull: false
    }
})



const questions = sequelize.define('question', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    solution: {
        type: DataTypes.STRING,
        allowNull: true
    },
    popular: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})

const Certification = sequelize.define('certification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    }
})



UserModel.hasMany(questions)
questions.belongsTo(UserModel)

UserModel.hasMany(paymentHistory)
paymentHistory.belongsTo(UserModel)

UserModel.hasMany(medicineHistory)
medicineHistory.belongsTo(UserModel)

EmployerModel.hasMany(sign)
sign.belongsTo(EmployerModel)

issues.hasMany(review)
review.belongsTo(issues)

BlogModel.hasMany(review)
review.belongsTo(BlogModel)

service.hasMany(sign)
sign.belongsTo(sign)

EmployerModel.hasMany(Certification)
Certification.belongsTo(EmployerModel)

EmployerModel.hasMany(review)
review.belongsTo(EmployerModel)

Ware.hasMany(Product)
Product.belongsTo(Ware)

module.exports = {
    UserModel,
    BlogModel,
    review,
    issues,
    service,
    EmployerModel,
    medicineHistory,
    paymentHistory,
    questions,
    sign,
    Certification,
    departmentModel,
    Ware,
    Product
}