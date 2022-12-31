
const { client } = require('../config/connectDB')
var ObjectId = require('mongodb').ObjectID;

// ****************************************************************************************************************************************
//Get all users from the database
const getAllUsers = async (req, res) => {
    try {
        const db = client.db("shopdb");
        const cursor = await db.collection("tblusers").find().toArray((err, documents) => {
            if (!err) {
                res.send(documents)
            }
        })
    } catch (e) {
        console.log(e)
    }
}

//Register new user

const registerUser = async (req, res) => {

    var user = {
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Email": req.body.Email,
        "Mobile": req.body.Mobile
    };

    try {
        const db = client.db("shopdb");
        await db.collection("tblusers").insertOne(user)
        console.log("Record Inserted")
    } catch (e) {
        console.log(e)
    }
}

//Get all products categories

const getAllProductsCategory = async (req, res) => {

    try {
        const db = client.db("shopdb");
        await db.collection("products").aggregate([{ $group: { _id: '$category' } }]).toArray((err, docs) => {
            if (!err) {
                console.log(docs)
                res.send(docs)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Get all Products based on category

const getProductsOfCategory = async (req, res) => {
    var selected_category = req.params.selected_category

    try {
        const db = client.db("shopdb");
        await db.collection("products").find({ category: { $regex: selected_category } }).toArray((err, documents) => {
            if (!err) {
                res.send(documents)
                console.log(documents)
            }
        })
    } catch (e) {
        console.log(e)
    }
}

// Get request for search products

const getSearchedProducts = async (req, res) => {
    var search_key = req.params.search_key

    try {
        const db = client.db("shopdb");
        await db.collection("products").createIndex({ title: "text", description: "text", category: "text" })
        await db.collection("products").find({ $text: { $search: search_key } }).toArray((err, documents) => {
            if (!err) {
                res.send(documents)
            }
        })
    } catch (e) {
        console.log(e)
    }
}

//Update Wishlist for user

const updateWishlist = async (req, res) => {

    var userID = req.body.userID
    var productID = req.body.productID
    console.log(req.body)
    try {
        const db = client.db('shopdb')
        const response = await db.collection("tblusers").findOneAndUpdate({ _id: ObjectId(userID) }, { $addToSet: { wishlist: productID } }, { upsert: true })
        console.log(response)
        res.send(response)
    } catch (e) {
        console.log(e)
    }
}

//Get user Wishlist i.e. product IDs here

const getUserWishlist = async (req, res) => {


    const userID = btoa(req.params.userID)

    try {
        const db = client.db('shopdb')
        await db.collection("tblusers").aggregate([
            { $match: { _id: ObjectId(userID) } },
            { $unwind: "$wishlist" },
            { $lookup: { from: 'products', localField: 'wishlist', foreignField: 'id', as: 'wishlist' } },
            { $project: { _id: 0, wishlist: 1 } }
        ]).toArray((err, docs) => {
            console.log(docs)
            res.send(docs)
        })

    } catch (e) {
        console.log(e)
    }
}

//Get all user wishlist products
const removeFromWishlist = async (req, res) => {


    const userID = btoa(req.params.userID)
    const productID = parseInt(req.params.productID)
    console.log(productID)
    try {
        const db = client.db('shopdb')

        const response = await db.collection("tblusers").findOneAndUpdate({ _id: ObjectId(userID) }, { $pull: { wishlist: productID } })

        res.send(response.value.wishlist)
    }
    // console.log(products)
    catch (e) {
        console.log(e)
    }
}

//Get user profile Data

const getUserProfileData = async (req, res) => {
    var userID = btoa(req.params.userID)
    console.log(req.params.userID)
    try {
        const db = client.db('shopdb')

        await db.collection('tblusers').find({ _id: ObjectId(userID) }).project({_id:0, Password:0, wishlist:0}).toArray((err, documents) => {
            if (!err) {
                console.log(documents)
                res.send(documents)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Update user Email

const updateUserEmail = async (req, res) => {

    var userID = req.body.userID
    var updatedEmail = req.body.Email
    console.log(req.body)
    try {
        const db = client.db('shopdb')

        const response = await db.collection("tblusers").findOneAndUpdate({ _id: ObjectId(userID) }, { $set: { Email: updatedEmail } })
        
        res.send(response.value)
    } catch (e) {
        console.log(e)
    }

}

//Update user Mobile

const updateUserMobile = async (req, res) => {

    var userID = req.body.userID
    var updatedMobile = req.body.Mobile
    console.log(req.body)
    try {
        const db = client.db('shopdb')

        const response = await db.collection("tblusers").findOneAndUpdate({ _id: ObjectId(userID) }, { $set: { Mobile: updatedMobile } })
        
        res.send(response)
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getAllUsers,
    registerUser,
    getProductsOfCategory,
    getSearchedProducts,
    updateWishlist,
    getUserWishlist,
    removeFromWishlist,
    updateUserEmail,
    updateUserMobile,
    getUserProfileData
}
