const addressModel = require("../../models/userAddressModel"); // Adjust path as necessary

async function addressController(req, res) {
    try {
        // Extract address data from request body
        const { name, email, address, city, state, zipCode, phone } = req.body;

        // Validate required fields
        if (!name || !email || !address || !city || !state || !zipCode || !phone) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }

        // Create a new address document
        const newAddress = new addressModel({
            name,
            email,
            address,
            city,
            state,
            zipCode,
            phone
        });

        // Save the address document to the database
        await newAddress.save();

        res.status(201).json({
            message: 'Address saved successfully',
            error: false,
            success: true,
            data: newAddress
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = addressController;
