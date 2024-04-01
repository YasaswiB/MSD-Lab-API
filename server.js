//create express app(http server inside)
const express = require('express');
const users = require('./data'); // Assuming this is your user data module
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/users', (req,res)=>res.json(users) )

app.get('/users/:id', (req,res)=>{
    let modifiedUser = req.params.id;
    let index = users.findIndex(user => user.id===modifiedUser);
    if(index==-1){
        res.send({message:"User not found"});
    }
    else{
        res.send({message:"Users Details",payload:users[index]});
    }
    //res.json(users[req.params.id]);

} )

app.post('/user', (req,res)=>{
    res.json(users.push(req.body)) 
    res.send({message:'Added'});
} )

app.put('/users/:id', (req,res)=>
{
    let modifiedUser = req.body;
    let index = users.findIndex(user => user.id===req.params.id);
    if(index==-1){
        res.send({message:"User not found"});
    }
    else{
    users[index] = modifiedUser;
    //user.splice(index, 1,modifiedUser);
    res.send({message:"User Updated"});
    }
})

app.delete('/users/:id', (req,res)=> {
    let modifiedUser = req.params.id;
    let index = users.findIndex(user => user.id===modifiedUser);
    if(index==-1){
        res.send({message:"User not found"});
    }
    else{
    users.splice(index, 1);
    res.send({message:"User deleted"});
    }
});

//assign port number
const PORT = 3500;
app.listen(PORT, ()=>{console.log(`listening on ${PORT}`)});