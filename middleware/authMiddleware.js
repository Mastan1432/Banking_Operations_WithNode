const jwt=require('jsonwebtoken');

const authenticateUser=(req,res,next)=>{
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token=authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"invaid token format"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(error){
        res.status(400).json({message:"Invalid token"});
    }

};

module.exports=authenticateUser;