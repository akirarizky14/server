const catModels = require('../../models/catModels');

const postCategories = async (req, res) => {
    try {
        const { name_cat, desc } = req.body;
        const user_id = req.user._id;

        const cat = await catModels.create({
            name_cat: name_cat,
            desc: desc,
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
        const { name_cat, desc } = req.body;
        const user_id = req.user._id;

        const cat = await catModels.findOneAndUpdate(
            { _id: id, user_id: user_id },
            { name_cat, desc },
            { new: true }
        );

        if (!cat) {
            return res.status(404).json({ error: 'Category not found or not authorized' });
        }

        res.status(200).json(cat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user._id;

        const cat = await catModels.findOneAndDelete({ _id: id, user_id: user_id });

        if (!cat) {
            return res.status(404).json({ error: 'Category not found or not authorized' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { postCategories, updateCategories, deleteCategories, getAllCategories };
