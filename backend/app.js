const express=require("express");
const app=express();
const cors=require("cors");
const connectDB = require('./conn/conn.js');
const auth= require("./routes/auth.js")
const list= require("./routes/list.js");
app.use(express.json());
app.use(cors())
// Connect to the database
connectDB();

//Initial Request
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/v1",auth);
app.use("/api/v2",list)
//Server Listening
app.listen(1000,()=>{
    console.log("Server Started");
});
