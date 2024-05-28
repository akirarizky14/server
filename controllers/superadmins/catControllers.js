const catModels = require('../../models/catModels');

const postCategories = async (req, res) => {
    try {
        const { cat_type, name_cat, desc, level_cat } = req.body;
        const user_id = req.user._id;

        const cat = await catModels.create({
            cat_type: cat_type,
            name_cat: name_cat,
            desc: desc,
            level_cat: level_cat,
            user_id: user_id
        });

        res.status(200).json(cat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllCategories = async (req,res) =>{
    try {
        const cat = await catModels.find();
        res.status(200).json(cat)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateCategories = async (req,res)=>{
    try {
        const id = req.params;
        const cat = await catModels.findOne({user_id : id});
        console.log(cat)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCategoriesbyUser = async (req,res) =>{
    try {
        const user_id = req.params
        const cat = await catModels.find({user_id})
        res.status(200).json(cat)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
module.exports = { postCategories, getAllCategories ,getCategoriesbyUser};
