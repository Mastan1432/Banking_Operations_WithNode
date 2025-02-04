# 🏦 Banking Operations with Node.js

A **secure and efficient** banking application built with **Node.js**, **Express.js**, and **MongoDB**. This project enables users to **register, log in, check balances, deposit, withdraw, and transfer funds**, while maintaining a **transaction history**.

---

## 🚀 Features

- **User Authentication** (JWT-based)
- **Deposit & Withdraw Money**
- **Transfer Funds Securely**
- **Transaction History Tracking**
- **Account Balance Inquiry**
- **Error Handling & Security Measures**

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Render (or any cloud platform)
- **Version Control:** Git & GitHub

---

## 📦 Installation

1️⃣ **Clone the repository**  
```bash
git clone https://github.com/Mastan1432/Banking_Operations_WithNode.git
```
2️⃣ **Navigate to the project directory**
```bash
cd Banking_Operations_WithNode
```
3️⃣ **Install dependencies**
```bash
npm install
```
4️⃣ **Set up environment variables**
Create a .env file and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5️⃣ **Run the application**
```bash
npm start
```
##🔑 API Endpoints
**User Authentication**
Method	Endpoint	Description
**POST	/api/auth/register**	Register a new user
**POST	/api/auth/login**	Login and get JWT Token
Banking Operations

Method	Endpoint	Description
**GET	/api/bank/balance**	Get user account balance
**POST	/api/bank/deposit**	Deposit money into account
**POST	/api/bank/withdraw**	Withdraw money from account
**POST	/api/bank/transfer**	Transfer money to another user
**GET	/api/bank/transactions**	Get transaction history

##📜 License
This project is licensed under the MIT License.

##📩 Contact
For any queries or suggestions, feel free to reach out:

GitHub: @Mastan1432
Email: mastanvali2002@gmail.com


