const catModels = require('../../models/catModels');

const getAllCategoriesCustomer = async(req,res) =>{

    try {
        const getCategories = await catModels.find()
        res.status(200).json(getCategories)    
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

module.exports = {getAllCategoriesCustomer}