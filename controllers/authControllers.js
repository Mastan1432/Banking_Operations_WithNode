const User=require("../models/User");
const jwt=require("jsonwebtoken");


const signup=async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        
        // checking if  user already exist or not
        const existingUser=await User.findOne({$or :[{ email },{ username }] });

        if(existingUser){
            return res.status(400).json({message:"user already registered"});
        }

        // create new user
        const newUser=new User({username,email,password});
        await newUser.save();

        // genereate jwt token
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"1hr"});

        // send responce
        res.status(201).json({
            message:"user created successfully",
            token,
        });
    }catch(error){
        res.status(400).json({message:"error creating user",error});
    }
};


const login=async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        const user=await User.findOne({$or:[{email},{username}] });

        if(!user){
            return res.status(400).json({message:"invalid username or email"});
        }

        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1hr"});
        console.log(token);
        
        res.status(201).json({
            message:"login successful",
            token,
        });
    }catch(error){
        res.status(500).json({message:"erroe logging in",error});
    }
}
module.exports={signup,login};