const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)



const loginModel = mongoose.model('login', loginSchema)

module.exports = loginModel