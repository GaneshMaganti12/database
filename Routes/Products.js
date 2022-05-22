const express = require('express')
const router = express.Router()
const Product = require('../Model/Products')
const {isAuthenticatedUser, authorizeRoles} = require('../Middleware/User')
const advancedQuery = require('../Middleware/Advanced-query')


router.get('/',[isAuthenticatedUser, advancedQuery(Product)], async(req, res) =>{
    // const data = await Product.find()

    // console.log(req.query.select)
    // let query = Product.find()

    // if(req.query.select){
    //     console.log(req.query.select)
    //     let selectStr = req.query.select.split(',').join(" ")
    //     console.log(selectStr)

    //     query = query.select(selectStr)
    // }

    // if(req.query.sort){
    //     console.log(req.query.sort)

    //     query = query.sort(req.query.sort)
    // }


    // let product = await query


    res.status(201).json(res.advancedQueryResult)
})

router.post('/',[isAuthenticatedUser, authorizeRoles('admin')], async(req, res) =>{
    const create = await Product.create(req.body)
    res.status(201).json(create)
})

router.delete('/:id',isAuthenticatedUser, async(req, res) =>{
    const deleted = await Product.findByIdAndDelete(req.params.id)
    res.status(201).json("deleted data")
})

router.patch('/:id',isAuthenticatedUser, async(req, res) =>{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json("updated data")
})


module.exports = router