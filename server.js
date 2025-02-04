// import required modules
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config();

// import routes
const authRoutes=require("./routes/authRoutes");
const bankRoutes=require("./routes/bankRoutes")
// initialize express app
const app=express();

// middleware to parse the json
app.use(bodyParser.json());

// set up mongodb connection
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then(()=>console.log("monogoDB connected successfully"))
.catch((err)=>console.log("MongoDb connection failed",err));


// register routes
app.use("/api/auth",authRoutes);
app.use("/api/bank",bankRoutes);


// to test the server
app.get("/",(req,res)=>{
    res.send('welcome to the Banking backend API');
});


// define port to listen
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on poort ${PORT}`);
});