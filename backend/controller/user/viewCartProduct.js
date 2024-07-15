const addToCartModel = require("../../models/cartProduct")

const viewCartProduct = async(req, res)=>{

    try {
        
        const currentUser = req.userId
        const allProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")

        res.status(201).json({
            data: allProduct,
            message: "Ok",
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

module.exports = viewCartProduct