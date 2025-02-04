const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

// user schemaa
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    balance:{type:Number,default:0},
    transactions:[
        {
            type:{type:String,enum:['deposite','withdraw','transfer'],required:true},
            amount:{type:Number,required:true},
            date:{type:Date,default:Date.now},
            receiver:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:false}
        }
    ]
});

// hash password before saving the user document
userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return next();
    // this.isModified(password)  only checks 
    // whether the password field has been explicitly
    //  modified in the current operation.

    try{
        // Check if the new password is the same as the old password
        // if (this.password === this._originalPassword) {
        //     return next(); // Skip rehashing if the password hasn't changed
        // }
        
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    }
});

// method to comapre password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

// create the user model
const User=mongoose.model('User',userSchema);

module.exports=User;

