const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');


//Register User
exports.register = async (req,res)=>{

    const { username,email,password } =req.body;

    try{
        //Check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({msg:"User already exists!"});
        }

        //hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        //store user
        const newUser = new User({username,email,password:hashedPassword});
        await newUser.save();
        res.status(200).json({msg:"User added successfully!"});

        //generate token
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn: '1h'});
        res.json({token});

    }catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

};

//Login User
exports.login =async (req,res)=>{

    const { email,password } = req.body;
    
    try{
        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        //Check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        //generate token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1h'});

        res.json({token});

    }catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};