const { MongoClient, ServerApiVersion } = require('mongodb');

/* Connecting to the MongoDB Atlas cluster. */
const uri = "mongodb+srv://admin:admin@container.qdz4bit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
});

module.exports = client