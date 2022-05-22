const expressAsyncHandler = require("express-async-handler");

const advancedQuery = (model) => expressAsyncHandler( async(req, res, next) => {

    console.log(req.query.select) // title,description
    let query =  model.find();
    if(req.query.select){
        let fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
        // query.select('title desc')
        // query.select('title,desc')
    }

    console.log('after select...');

    if(req.query.sort){
        query = query.sort(req.query.sort)
    }
    else{
        query = query.sort('-createdAt')
    }

    console.log('after sort...');
   
    // const tasks = await Task.find().select(selectStr); // title description
    // const tasks = await Task.find().sort('-title');
    // const tasks = await Task.find().skip(2);

    let results = await query;

    console.log(results);

    res.advancedQueryResult = results

    next();
    

    // console.log(tasks);
    // res.status(200).json(tasks);
})

module.exports = advancedQuery;