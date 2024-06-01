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

const getAllCategories = async (req, res) => {
    try {
        const cat = await catModels.find();
        res.status(200).json(cat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const { cat_type, name_cat, desc, level_cat } = req.body;
        const user_id = req.user._id;

        const cat = await catModels.findOneAndUpdate(
            { _id: id, user_id: user_id },
            { cat_type, name_cat, desc, level_cat },
            { new: true } // This option returns the updated document
        );

        if (!cat) {
            return res.status(404).json({ error: 'Category not found or not authorized' });
        }

        res.status(200).json(cat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCategoriesbyUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const cat = await catModels.find({ user_id: user_id });
        res.status(200).json(cat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { postCategories, updateCategories, getAllCategories, getCategoriesbyUser };
