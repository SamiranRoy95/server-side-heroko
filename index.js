const express=require("express");
const { MongoClient } = require('mongodb');
const cors=require("cors");
const ObjectId=require("mongodb").ObjectId;
require('dotenv').config()
const app=express();
const port= process.env.PORT ||5000;
app.use(cors())
app.use(express.json())

//user:mydbuser1
//pass:2cKuKzwaTjiLcbcl

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5d0ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const database = client.db("firstdb");
//     const collection=database.collection("firstcollection");
//     console.log("hitting the database");
//     const user={
//         name:"Samiran",profession:"Bussinesman",age:25
//     }

//     collection.insertOne(user)
//     .then(()=>{
//         console.log("insert success")
//     })


//     // perform actions on the collection object
//     // client.close();
//   });


// Through async function

//  async function run(){
// try{
//     await client.connect()
//     const database=client.db("asyncdatabase")
//     const collection=database.collection("asynccoll")
//     const user={name:"Ruman",age:25,profession:"Ajoya"}
//     collection.insertOne(user)
//     console.log("hitting the post post")

// }
// finally{

//     // await client.close()
// }


// }
// run().catch(console.dir)

 async function run(){
try{

    await client.connect();
    const database=client.db("ecommerce");
    const collection =database.collection("ecommercecoll")
    // const user={
    //     name:"Samiran" ,sound:"r nei",dream:"so much large"
    // }



    app.get("/users",async(req,res)=>{
        const cursor=collection.find({});
        const users= await cursor.toArray();
        res.send(users)

    })

    app.get("/users/:id",async(req,res)=>{
const id=req.params.id;
const query={_id:ObjectId(id)};
const user= await collection.findOne(query)


console.log(id);
res.send(user)


    })
    //send data to database by post method
    app.post("/users",async(req,res)=>{

const newUser=req.body;
console.log(newUser);
const result= await collection.insertOne(newUser)
console.log(result)

res.json(result)

    })

    app.put("/users/:id",async(req,res)=>{
const id =req.params.id;
const user=req.body;
const filter={_id:ObjectId(id)};
const options = { upsert: true };
const updateDoc = {
    $set: {
     name:user.name,
     email:user.email
    },
  };
  const result = await collection.updateOne(filter, updateDoc, options);
console.log("updating user",id)
res.json(result)

    })

    //Delete API
    app.delete("/users/:id",async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const result =await collection.deleteOne(query);
        console.log("deleting id",result)
        res.json(result)

        
    })



    // collection.insertOne(user)
    // console.log("hitting the second time post")
}
finally{
    // await client.close()
}
}
run().catch(console.dir)


//I am writting async function again

//  async function  run(){

// try{
// await client.connect()
// const database=client.db("database");
// const collection=database.collection("collection");
// //post api
// app.post("/user",async(req,res)=>{
// const newUser=req.body;
// const outcome=await collection.insertOne(newUser);
// console.log(newUser)
// console.log("got the user",outcome)
// console.log("hittingt the post ")
// res.send("hitting the post")
// res.json(outcome)

// })
// const user={name:"singer",profession:"shironamhin"}

// collection.insertOne(user)
// console.log("hitting the database")

// }
// finally{
//     await client.close()
// }

// }
// run().catch(console.dir)








app.get("/",(req,res)=>{

res.send("This is first responsed from server side side")

})

app.listen(port,()=>{

    console.log("This is listening port port",port)
})