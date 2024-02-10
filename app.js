const express = require('express')
require('dotenv').config();
require("./config/db").connectToMongoDB();

const app=express();
app.use(express.json())


app.get("/",(req,res)=>{
    return res.status(200).send({message: "welcome" , status:true})
})

const authRouters = require('./routes/authRoute')
app.use('/auth',authRouters);

const courseRouters = require('./routes/courseRoute')
app.use('/api',courseRouters)

const PORT=4500;
app.listen(PORT,async()=>{
    // await connDB();
    console.log("listen on port:", PORT)
})