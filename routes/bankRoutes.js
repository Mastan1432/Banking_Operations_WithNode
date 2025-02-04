const express=require("express");

const{getBalance,deposit,withdraw,transfer, getTransactionHistory}=require("../controllers/bankController")
const authenticateUser=require("../middleware/authMiddleware");

const router=express.Router();

router.get("/balance",authenticateUser,getBalance);
router.post("/deposit",authenticateUser,deposit);
router.post("/withdraw",authenticateUser,withdraw);
router.post("/transfer",authenticateUser,transfer);
router.get("/history",authenticateUser,getTransactionHistory);

module.exports=router;