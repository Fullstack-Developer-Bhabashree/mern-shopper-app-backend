require('dotenv').config()
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        await client.connect()
        console.log('MongoDB connection establised ')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

module.exports = { connectDB, client }