const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  address: { type: String, required: true },
});

const Registration = mongoose.model('registration', registrationSchema);
module.exports = Registration;
