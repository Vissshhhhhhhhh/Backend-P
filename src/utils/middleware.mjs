import {users} from "../constants.mjs";

export const getUserById = (req,res,next)=>{
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
};

