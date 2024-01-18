const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const database = 'dev123';
const client = new MongoClient(url);

async function dbConnect() {
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('node_tut');
}

module.exports= dbConnect;  