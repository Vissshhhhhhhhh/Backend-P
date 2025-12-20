import express from "express";
import {createUserValidateionSchema} from './utils/validationSchema.mjs';
import { validationResult, matchedData, checkSchema } from "express-validator";

const app = express();



app.use(express.json())
// If using Middleware here then need to get 3rd parameter (next())

const users=[
    {id:1,name:"viswa"},
    {id:2,name:"tharunica"}
]

const getUserById = (req,res,next)=>{
    const hasid = parseInt(req.params.id);
    if(isNaN(hasid)){
        return res.status(400).send({msg:"User not found"});
    }
    const userind = users.findIndex((u)=>u.id ===hasid);
    if(userind===-1){
        return res.status(404).send({msg:"Not found userid"});
    }
    req.userInd = userind;
    next();
}

//POST REQUEST WITH VALIDATION USING EXPRESS VALIDATOR
app.post('/users',
    checkSchema(createUserValidateionSchema),
    (req,res)=>{
        const result = validationResult(req);

        if(!result.isEmpty()){
            return res.status(400).send({error:result.array()});
        }

        const body = matchedData(req);
        const newuser ={id:users[users.length-1].id+1,...body};
        users.push(newuser);
        return res.status(200).send(newuser);
})

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

// Query params

app.get('/users',(req,res)=>{
    const {filter,value} = req.query;
    if(filter && value){
        return res.send(users.filter((u)=>u[filter].toLowerCase().includes(value.toLowerCase())));
    }
    return res.send(users);
    
})
// localhost:3000/users?filter=user_name&value=thar

 // app.use('/users',(req,res)=>{
    //     const {body} = req;
    //     const newuser = {id:users[users.length-1].id+1, ...body};
    //     users.push(newuser);
    //     return res.status(201).send(newuser);
    // })
    
//PUT REQUEST - UPDATE(COMPLETE UPDATE)
    

app.put('/users/:id',(req,res)=>{
    const {body}=req;
    const hasid = parseInt(req.params.id);
    if(isNaN(hasid)){
        return res.status(400).send({msg:"User not found"});
    }
    const userind = users.findIndex((u)=>u.id ===hasid);
    if(userind===-1){
        return res.status(404).send({msg:"Not found userid"});
    }
    users[userind] = {id:hasid, ...body};
    return res.status(200).send(users[userind]);

});

//PATCH REQUEST

app.patch('/users/:id',(req,res)=>{
    const {body}=req;
    const hasid = parseInt(req.params.id);
    if(isNaN(hasid)){
        return res.status(400).send({msg:"User not found"});
    }
    const userind = users.findIndex((u)=>u.id ===hasid);
    if(userind===-1){
        return res.status(404).send({msg:"Not found userid"});
    }
    users[userind] = {...users[userind], ...body};
    return res.status(200).send(users[userind]);
})

// DELETE REQUEST

app.delete('/users/:id',getUserById,(req,res)=>{
    const index = req.userInd;
    console.log(index);
    users.splice(index,1);
    res.sendStatus(200)
})






app.listen(3000,()=>{   
    console.log(`currently listening port 3000`);
})  