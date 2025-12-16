import express from "express";

const app = express();
const PORT = 3000;
app.get('/', (req,res)=>{
    res.json({msg:"hello hi this is my first backend code"});

});

app.listen(PORT,()=>{console.log("Running on port ${PORT}")});