const mongoose = require('mongoose');
const FitnessSchema= new mongoose.schema({
category:{
    type: String,
    required: true
},
schedule_date:{
    type: date,
    required: true
},
schedule_time:{
    type: String,
    required: true
},

instructor:{
    type: String,
    required: true
},

});

FitnessSchema.statics.addlogin=async function(formData){
    const form= new this(formData);
    return await form.save();
};

const FitnessModel= mongoose.model('login',FitnessSchema);
MediaSourceHandle.exports=FitnessModel;