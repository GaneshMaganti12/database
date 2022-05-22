const Task = require('../Model/Task')
const asyncHandler = require('express-async-handler')

exports.addTasks = asyncHandler(async(req, res) =>{
    const task = await Task.create(req.body)

    res.status(201).json(task)
})

exports.getTasks = asyncHandler(async(req, res) =>{

    // console.log(req.query.select)
    // let query = Task.find()

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


    // let task = await query
    // const task = await Task.find().select("title")    it is used for select the data
    //const task = await Task.find().sort("-title")      it is used for sorting the data means "-title" used for descending and "title" used for ascending
    //const task = await Task.find().limit(2).sort("-title")   it is used for limitng the data means when give number value then it shows that much data
    // we have to give like above 

    //const task = await Task.find().skip(2)


    res.status(200).json(res.advancedQueryResult)
})

exports.getUserTask = asyncHandler(async(req, res) =>{
    const task = await Task.find({user: req.params.userid})   // how many tasks created by specific user

    res.status(200).json(task)
})