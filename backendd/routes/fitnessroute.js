const express=require('express')

const fitnessController=require('../controller/FitnessClassController')
const router=express.Router()

router.post('/login',fitnessController.LoginForm)


module.exports=router;