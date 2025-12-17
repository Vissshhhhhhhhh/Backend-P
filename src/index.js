import express from "express";
const app = express();

// If using Middleware here then need to get 3rd parameter (next())

const users=[
    {id:1,name:"viswa"},
    {id:2,name:"tharunica"}
]
// Route params
app.get('/users/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send("Invalid user");
    }
    const user = users.find(u=>u.id===id);
    if(!user){
        return res.status(404).json('User not found');
    }

    return res.status(200).send(user);
})

app.get('/',(req,res)=>{
    res.send('server is running');
})

app.listen(3000,()=>{
    console.log(`currently listening port 3000`);
})