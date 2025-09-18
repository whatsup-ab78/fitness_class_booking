const mongoose = require('mongoose');
const Bookingschema= new mongoose.schema({
userid:{
    type: String,
    required: true
},
classid:{
    type: String,
    required: true
},
status:{
    type: String,
    required: true
},

booking_date:{
    type: date,
    required: true
},

});

Bookingschema.statics.addBooking=async function(formData){
    const form= new this(formData);
    return await form.save();
};

const Bookingmodel= mongoose.model('Booking',Bookingschema);
MediaSourceHandle.exports=Bookingmodel;