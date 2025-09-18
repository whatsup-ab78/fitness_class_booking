const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
        
    },
    usertype: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user',
    required: true 
  },
  status: { type: String, default: 'active', required: true },
})

LoginSchema.statics.addlogin = async function (formData){
    const form = new this(formData);
    return await form.save();
};

const Loginmodel = mongoose.model('login',LoginSchema);
module.exports = Loginmodel;
