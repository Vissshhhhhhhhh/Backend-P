import express from "express";
import {users} from "./constants.mjs";
import router from "./routes/users.mjs";
import cookieParser, { signedCookie } from "cookie-parser";

const app = express();
app.use(cookieParser("tharunicaviswanath"));
app.use(express.json());
app.use(router);

app.get("/",(req,res)=>{
    res.cookie("user","Admin", {maxAge: 60000*60,signed : true});
    res.send({msg:"Root"});
})
// If using Middleware here then need to get 3rd parameter (next())

//POST REQUEST WITH VALIDATION USING EXPRESS VALIDATOR

// Query params

// localhost:3000/users?filter=user_name&value=thar
    
//PUT REQUEST - UPDATE(COMPLETE UPDATE)

//PATCH REQUEST

// DELETE REQUEST

app.listen(3000,()=>{   
    console.log(`currently listening port 3000`);
})  