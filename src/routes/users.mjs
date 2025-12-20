import {users} from "../constants.mjs";
import {Router} from "express"
import { validationResult, matchedData, checkSchema } from "express-validator";
import {getUserById} from "../utils/middleware.mjs"
import {createUserValidateionSchema} from '../utils/validationSchema.mjs';

const router = Router();

router.get('/users',(req,res)=>{

    console.log(req.signedCookies);
    if(req.signedCookies.user && req.signedCookies.user==="Admin"){
        const {filter,value} = req.query;
        if(filter && value){
            return res.send(users.filter((u)=>u[filter].toLowerCase().includes(value.toLowerCase())));
        }
        return res.send(users);
    }
    else return res.send({msg:"You're not an Admin"});
    
})

// Route params
router.get('/users/:id',(req,res)=>{
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

router.post('/users',
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

router.put('/users/:id',(req,res)=>{
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

router.patch('/users/:id',(req,res)=>{
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

router.delete('/users/:id',getUserById,(req,res)=>{
    const index = req.userInd;
    console.log(index);
    users.splice(index,1);
    res.sendStatus(200)
})

export default router;