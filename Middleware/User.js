const User = require('../Model/User')
const jwt = require('jsonwebtoken')


const isAuthenticatedUser = async function(req, res, next){
    // console.log(req.headers)
    const token = req.headers['authorization']

    if(token){
        const tokens = token.split(" ")
        // console.log(tokens)
        try{
            const decode = jwt.verify(tokens[1], 'p@ssw0rd')
            console.log(decode)
            if(decode.role){
                req.role = decode.role
            }
            next();
        }catch(err){
            console.log(err)
            res.json("You are not authorized")
        }
    }else{
        res.json("You are not authorized")
    }
}

const AuthenticateUser = async function(req, res, next){
    const user = await User.findOne({email: req.body.email})

    if(user){
        const isMatch = await user.matchPassword(req.body.password)
        if(isMatch){
            next()
        }else{
            res.json("Invalid Password")
        }
    }else{
        res.json("Invalid User")
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next)=> {
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(403).send('You dont have an authorized role to access')
        }
    }
}

module.exports = {AuthenticateUser, isAuthenticatedUser, authorizeRoles}