const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken')
const { strikethrough } = require('colors')


const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/@gmail.com$/, "please enter valid email"]
    },
    password: {
        type: String,
        minlength: 6
    },
    newPassword: String,
    resetToken: String,
    expireToken: Date,
    role: {
        type: String,
        default: "user"
    },
    createdby:{
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

UserSchema.methods.jwtSignup = function(){
    const token = jwtToken.sign({id: this._id, role: this.role}, 'p@ssw0rd', {expiresIn: "10d"})
    return token
}


const User = mongoose.model('User', UserSchema)


module.exports = User