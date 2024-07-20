const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countCartProduct = require('../controller/user/countCartProduct')
const viewCartProduct = require('../controller/user/ViewCartProduct')
const updateCartProduct = require('../controller/user/updateCartProduct')
const deleteCartProduct = require('../controller/user/deleteCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const addressController = require('../controller/user/userAddress')
// const paymentController = require('../controller/order/paymentController')



router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// Admin Panel
router.get("/all-users",authToken, allUsers)
router.post("/update-user", authToken, updateUser)
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)

// Home page
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)

router.post("/product-details", getProductDetails)

router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// User cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countCartProduct", authToken, countCartProduct)
router.get("/view-cart-product", authToken, viewCartProduct)
router.post("/update-cart-product", authToken, updateCartProduct)
router.post("/delete-cart-product", authToken, deleteCartProduct)

// payment and order
// router.post("/checkout", authToken, paymentController)

//user address and information
router.post("/address", authToken, addressController )


module.exports = router