const addToCartModel = require("../../models/cartProduct")


const addToCartController = async(req, res)=>{

    try {
        
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAlreadyInCart = await addToCartModel.findOne({productId, userId: currentUser})

        if(isProductAlreadyInCart) {
            return res.status(409).json({
                message: "This product is already in the cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newProductAddToCart = new addToCartModel(payload)
        const saveProductToCart = await newProductAddToCart.save()

        res.status(201).json({
            message: "Product added to cart",
            data: saveProductToCart,
            success: true,
            error: false
        })


    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }

}


module.exports = addToCartController
