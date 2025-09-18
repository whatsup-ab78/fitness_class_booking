const Registration = require('../model/registrationmodel');
const Login = require('../model/Loginmodel');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phonenumber, address, password } = req.body;

    // 1. Save to registration collection
    await Registration.create({ name, email, phonenumber, address });

    // 2. Save to login collection
    await Login.create({
      username: email,
      password: password,
      usertype: 'user',
      status: 'active',
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
