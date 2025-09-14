const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
        
    },
    phonenumber: { 
        type: String,
        require: true
    },
    address: {
        type:String,
        require: true
    },
})

registrationSchema.statics.addregister = async function (formData){
    const form = new this(formData);
    return await form.save();
};

const registrationmodel = mongoose.model('registration',registrationSchema);
module.exports = registrationmodel;
