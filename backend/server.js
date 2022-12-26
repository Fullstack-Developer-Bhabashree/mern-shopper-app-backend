
const { connectDB } = require('./config/connectDB')

var express = require("express");

var cors = require("cors");

var app = express();

app.use(cors({
    origin:["http://localhost:3000", "https://mern-shopper-app.onrender.com"]
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const routes = require('./routes/routes')

app.use(routes)

app.get("/", (req, res) => {
    res.send("<h2>Shopping API</h2>");
})


const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


startServer();
