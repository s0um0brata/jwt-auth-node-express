const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const sercretKey = "deepisagoodbo$y";

app.get('/',(req, res)=>{
    res.json({
        message:"A sample api"
    })
})


app.post("/login", (req, res)=>{
    const user = {
        id:1,
        username:"deep",
        email:"deep@gmail.com"
    }
    jwt.sign({user}, sercretKey, {expiresIn:'2h'}, (err, token)=>{
        res.json({token})
    })
})

app.post("/profile", verifyToken, (req, res)=>{
    jwt.verify(req.token, sercretKey, (err, authData)=>{
        if(err){
            res.send({result:"Invalid Token!"})
        }else{
            res.json({
                message:"Profile Accessed",
                authData
            })
        }
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token
        next();
    }else{
        res.send({
            result:"Token is not valid"
        })
    }
}


app.listen(5000,()=>{
    console.log("App is ruuning on port http://localhost:5000");
})