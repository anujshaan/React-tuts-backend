const Users = require('../models/userModel');
const bcrypt = require('bcrypt')

const authCtrl = {
  register: async(req,res)=>{
    
    try {
      const {firstname, lastname,username, email, password,phnumber, cfpassword} = req.body;
      
      const user_email = await Users.findOne({email});
      if(user_email) return res.status(400).json({msg:`This email is already taken!`})

      const user_name = await Users.findOne({username});
      if(user_name) return res.status(400).json({msg:`This username is already taken!`})

      if(password.length < 6)
        return res.status(400).json({msg:'Password must be atleast 6 character long!'})

      if(cfpassword !== password)
        return res.status(400).json({msg:"Password not matched"})
      
      const hashedPass = await bcrypt.hash(password,12);

      const newUser = new Users({
        firstname, lastname, email,username, password:hashedPass, phnumber
      })


      await newUser.save();

      res.json({
        msg:"Registeration Successfull",
        user:{
          ...newUser._doc,
          password:''
        }
      })

      
    } catch (error) {
      return res.status(500).json({msg:error.message})
    }
  },
  login: async(req,res)=>{
    console.log(req.body)
    try {
      const {email, password} = req.body;
      const user = await Users.findOne({email}).populate("firstname lastname phnumber");

      if(!user)
        return res.status(400).json({msg:'No user found'});

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg:'Incorrect username or password'})


      res.json({
        msg:"Login Successfull",
        user:{
          ...user._doc,
          password:''
        }
      })

      
    } catch (error) {
      return res.status(500).json({msg:error.message})
    }
  }
}


module.exports = authCtrl;