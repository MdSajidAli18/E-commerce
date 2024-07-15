const addToCartModel = require("../../models/cartProduct")

const deleteCartProduct = async(req, res)=>{

    try {
        
        const currentUserId = req.userId
        const cartProductId =req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id: cartProductId})

        res.status(201).json({
            message: "Product deleted from cart",
            data: deleteProduct,
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

module.exports = deleteCartProduct