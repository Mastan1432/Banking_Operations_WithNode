const User=require("../models/User");

// get user balance
const getBalance=async (req,res)=>{
    try{
        const user= await User.findById(req.user.userId);
        res.status(200).json({balance:user.balance});
    }catch(error){
        res.status(500).json({message:"server error",error});
    }
};

// deposite money
const deposit=async(req,res)=>{
    const{amount}=req.body;

    if(amount<=0){
        return res.status(400).json({message:"deposit amount must be greater than 0"});
    }
    try{
        const user=await User.findById(req.user.userId);
        user.balance+=amount;
        user.transactions.push({type:"deposite",amount});
        await user.save();

        res.status(200).json({message:"deposite successfull",balance:user.balance});
    }catch(error){
        res.status(500).json({message:"server error",error});
    }
};

// withdraw money
const withdraw=async(req,res)=>{
    const{amount}=req.body;

    if(amount<=0){
        return res.status(400).json({message:"withdrw amount must be greater than 0"});
    }
    try{
        const user=await User.findById(req.user.userId);
        if(user.balance<amount){
            return res.status(400).json({message:"insufficient balance",balance:user.balance});
        }
        // update user amount
        user.balance-=amount;
        // update in transactions
        user.transactions.push({type:"withdraw",amount});
        // save updates
        await user.save();

        res.status(200).json({message:"withdraw successfull",balance:user.balance});
    }catch(error){
        res.status(500).json({message:"server error",error});
    }
}

// transfer money
const transfer=async(req,res)=>{
    const{recipientEmail,amount}=req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: "Transfer amount must be greater than zero" });
    }

    try{
        const sender=await User.findById(req.user.userId);
        const recipient=await User.findOne({email:recipientEmail});

        if(!recipient){
            return res.status(404).json({ message: "Recipient not found" });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        sender.balance-=amount;
        recipient.balance+=amount;

        sender.transactions.push({type:"transfer",amount,receiver:recipient._id});
        recipient.transactions.push({type:"deposite",amount});

        await sender.save();
        await recipient.save();

        res.status(200).json({ message: "Transfer successful", balance: sender.balance });
    }catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};

const getTransactionHistory=async(req,res)=>{
    try{
        const user=await User.findById(req.user.userId);
        res.json({transactions:user.transactions});
    }catch(error){
        res.status(500).json({message:"failed to retrive transactions",error});
    }
}
module.exports={getBalance,deposit,withdraw,transfer,getTransactionHistory};

