const {Router} = require('express')
const blogRouter = require('./blogRouter')
const empRouter = require('./empRouter')
const medHistRouter = require('./medHistRouter')
const questionRouter = require('./questionRouter')
const reviewRouter = require('./reviewRouter')
const serviceRouter = require('./serviceRouter')
const signRouter = require('./signRouter')
const userRouter = require('./userRouter')
const productRouter = require('../routes/productRouter')
const wareRouter =require( './wareRouter')

const api = new Router();

api.use('/blog', blogRouter)
api.use('/emp', empRouter)
api.use('/medHist', medHistRouter)
api.use('/question', questionRouter)
api.use('/review', reviewRouter)
api.use('/service', serviceRouter)
api.use('/sign', signRouter)
api.use('/auth', userRouter)
api.use('/product', productRouter)
api.use('/ware', wareRouter)

module.exports = api



