const addToCartModel = require("../../models/cartProduct")

const updateCartProduct = async(req, res)=>{

    try {
        
        const currentUserId = req.userId
        const cartProductId = req?.body?._id
        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id: cartProductId}, {
            ...(qty && {quantity: qty})
        })

        res.status(201).json({
            message: "Cart updated",
            data: updateProduct,
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

module.exports = updateCartProduct