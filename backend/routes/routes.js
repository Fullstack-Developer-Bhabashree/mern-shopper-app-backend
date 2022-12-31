const express = require('express')
const router = express.Router()
const { getAllUsers,
    registerUser,
    getAllProductsCategory,
    getProductsOfCategory,
    getSearchedProducts,
    updateWishlist,
    getUserWishlist,
    removeFromWishlist,
    updateUserEmail,
    updateUserMobile,
    getProductDetails,
    getUserProfileData
} = require('../controllers/controllers')


//Routes to get all users
router.get("/getusers", getAllUsers)

// Routes to insert new users
router.post("/registeruser", registerUser)

// Routes to get all products category in the database

router.get("/getAllProductsCategory", getAllProductsCategory)

// Routes to get all products in the database based on category
router.get("/products/category/:selected_category", getProductsOfCategory)

//Routes to search products 

router.get("/getSearchedProd/:search_key", getSearchedProducts)

//Routes to get products details

router.get("/getProductDetails/:productID", getProductDetails)


//Routes to update wishlist for user

router.post("/updateWishlist", updateWishlist)

//Routes to get user wishlist i.e. productsIDs

router.get("/getUserWishlist/:userID", getUserWishlist)

//Routes to remove a product from a wishlist

router.put("/removeFromWishlist/:productID/:userID", removeFromWishlist)

//Routes to get User Profile data

router.get("/getUserProfileData/:userID", getUserProfileData)

//Routes to update user Email

router.put("/updateUserEmail", updateUserEmail)

//Routes to update user Mobile

router.put("/updateUserMobile", updateUserMobile)

module.exports = router
