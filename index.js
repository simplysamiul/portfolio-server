const express = require("express");
const app = express();
const cors = require("cors"); 
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middle Ware
app.use(cors());
app.use(express.json());

// database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y4rvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
        await client.connect();
        const database = client.db("personalInfo");
        const portfolioInfo = database.collection("portfolio");

        // Get Api 
       app.get("/portfolio", async(req,res)=>{
            const cursor = portfolioInfo.find({});
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
       });
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

// Root route 
app.get("/", (req,res)=>{
    res.send("Hello Samiul");
})
// Port liseting
app.listen(port, (req,res)=>{
    console.log(`Port liseting at ${port}`);
});