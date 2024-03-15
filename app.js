const express = require('express')
require('dotenv').config();

const app=express();
app.use(express.json())


// app.get("/",(req,res)=>{
//     return res.status(200).send({message: "welcome" , status:true})
// })


const port= process.env.PORT;
app.listen(port,async()=>{
    console.log("listen on port:", port)
})

require("./config/db").connectToMongoDB();

const authRouters = require('./routes/authRoute')
app.use('/auth',authRouters);

const courseRouters = require('./routes/courseRoute')
app.use('/api',courseRouters)