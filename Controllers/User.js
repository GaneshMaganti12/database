const User = require('../Model/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
const colors = require('colors')
const crypto = require('crypto')


//sending to the mail
const sendingMail = asyncHandler((mailDetails) =>{
    const mailTransport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: 'ganesh.maganti12@gmail.com',
            pass: 'Ganiaslu777'
        }
    })

    mailTransport.sendMail(mailDetails, (err) =>{
        if(err){
            console.log("something error".red, err)
        }
        else{
            console.log("email has been sent")
        }
    })
})




// users signup to the app
exports.signup = asyncHandler(async(req, res) =>{
    const users = await User.create(req.body)

    let mailDetails = {
        from : 'workout.app@gmail.com',
        to : users.email,
        subject : 'Workout Registeration',
        text : "Your successfully registered in Workout App"
    }

    sendingMail(mailDetails)

    const token = users.jwtSignup()
    res.status(200).json({auth: true, token: token})
})




// users login to the app
exports.login = asyncHandler(async(req, res) =>{
    const user = await User.findOne({email: req.body.email})
    
    const token = user.jwtSignup()
    res.json({auth: true, token: token})
})




exports.getUsers = asyncHandler(async(req, res) =>{
    const user = await User.find()

    res.json(user)
})




exports.getUser = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.params.id)
    console.log(user)
    res.json(user)
})





// change the password

exports.isUserPassword = asyncHandler(async (req, res) =>{
    const token = req.headers['authorization']

    const tokens = token.split(" ")

    // const decoded = jwt.decode(tokens[1])

    const decoded = jwt.verify(tokens[1], 'p@ssw0rd')
    const user = await User.findById(decoded.id)
    
    const isMatch = await user.matchPassword(req.body.password)
    if(isMatch){
        const salt = await bcrypt.genSalt(10)
        const passwordNew = await bcrypt.hash(req.body.newPassword, salt)

        await User.findByIdAndUpdate({_id: user.id}, {password: passwordNew})

        res.status(201).json("Password is successfully changed")

    }else{
        res.json("Wrong password entered")
    }
})



// reset the password

exports.resetPassword = asyncHandler(async(req, res) =>{
    crypto.randomBytes(32, (err, buffer) =>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString('hex')
        User.findOne({email: req.body.email})
        .then(users =>{
            if(!users){
                return res.status(422).json("User does not exist")
            }
            users.resetToken = token
            users.expireToken = Date.now() + 3600000
            
            users.save().then(result => {
                let mailDetails = {
                    from : 'workout.app@gmail.com',
                    to : users.email,
                    subject : 'Workout Password Reset',
                    html:`
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3005/reset/${token}">link</a> to reset password</h5>
                     `
                }

                sendingMail(mailDetails)
            })
            res.json("check the mail")
        })
    })
})




exports.newPassword = asyncHandler(async(req, res) =>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})