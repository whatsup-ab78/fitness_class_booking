const mongoose = require('mongoose');
const UserSchema= new mongoose.schema({
name:{
    type: String,
    required: true
},
address:{
    type: String,
    required: true
},
place:{
    type: String,
    required: true
},

email:{
    type: String,
    required: true
},

});

UserSchema.statics.addUser=async function(formData){
    const form= new this(formData);
    return await form.save();
};

const Usermodel= mongoose.model('User',UserSchema);
MediaSourceHandle.exports=Usermodel;