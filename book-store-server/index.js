const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! teri maki saki naki')
})

// mongoDB

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://BookStore:SAMIRSADEK@cluster0.cmjacbf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const booksCollection = client.db('BookInventory').collection("books")

    app.post("/books", async(req, res) =>{
        const data = req.body
        const result = await booksCollection.insertOne(data)
        res.send(result)
    })

    // app.get("/books", async(req,res) =>{
    //   const result =await booksCollection.find().toArray()
    //   res.send(result)
    // })

    app.patch("/books/:id", async(req, res) =>{
      const id = req.params.id
      const update = req.body
      const filter = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set: {
          ...update
        },
      }
      const options = { upsert: true}
      const result = await booksCollection.updateOne(filter, updatedDoc, options)
      res.send(result)
    })

    app.delete("/books/:id", async(req, res) =>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await booksCollection.deleteOne(filter)
      res.send(result)
    })

    app.get("/books", async(req, res)=>{
      let query = {}
      if(req.query?.category){
        query = {category: req.query.category}
      }
      const result = await booksCollection.find(query).toArray()
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})