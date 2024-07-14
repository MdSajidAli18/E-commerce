const addToCartModel = require("../../models/cartProduct")

const countCartProduct = async(req, res)=>{

    try {
        
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId: userId 
        })

        res.status(201).json({
            data: {
                count: count
            },
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

module.exports = countCartProduct