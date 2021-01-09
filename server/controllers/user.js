const User = require('../models/user')

exports.getUsers =async (req,res)=>{
  try {
    const users =await User.find({})
    res.json({user})
  } catch (error) {
    console.log(error)
  }
}