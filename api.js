const express = require('express');
const dbConnect = require('./mongodb');
const app = express();

app.use(express.json());

app.get('/', async (req,resp)=>{
    let data =await dbConnect();
    data= await data.find().toArray();
resp.send(data)
})

app.post('/', async (req,resp)=>{
    let data  = await dbConnect();
    let result = await data.insert(req.body);
    resp.send(result);
})

app.put('/:name', async (req,resp)=>{
    let data  = await dbConnect();
    let result = await data.updateOne(
        {name:req.params.name},
        {$set:req.body},
    );
    resp.send({result:"updated"});
})

app.get("/search/:key",async (req,resp)=>{
    let data = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {brand:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);
})

app.listen(4000)