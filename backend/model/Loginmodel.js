const mongoose = require('mongoose');
const LoginSchema= new mongoose.schema({
username:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
},
usertype:{
    type: String,
    required: true
},

status:{
    type: String,
    required: true
},

});

LoginSchema.statics.addlogin=async function(formData){
    const form= new this(formData);
    return await form.save();
};

const Loginmodel= mongoose.model('login',LoginSchema);
MediaSourceHandle.exports=Loginmodel;