const catModels = require('../../models/catModels');
const userModels = require('../../models/userModels')

const postCategories = async (req, res) => {
    try {
        const { name_cat, desc } = req.body;
        const user_id = req.user._id;
        const checkName_cat = await catModels.findOne({name_cat : name_cat})
        if(checkName_cat){
            throw new Error("Category already exsits")
        }
        const checkName = await userModels.findOne({_id : user_id});
        console.log(checkName)
        if (!checkName) {
            return res.status(404).json({ error: 'User not found' });
        }
        const cat = await catModels.create({
            name_cat: name_cat,
            desc: desc,
            user_id: checkName.full_name
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
        const checkRoles = await userModels.findById({_id:user_id});
        if (checkRoles.roles !== 'Admin'){
            throw new Error("You dont have right to Delete")
        }
        const cat = await catModels.findOneAndUpdate(
            { _id: id},
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
        const checkRoles = await userModels.findById({_id:user_id});
        if (checkRoles.roles !== 'Admin'){
            throw new Error("You dont have right to Delete")
        }
        const cat = await catModels.findOneAndDelete({ _id: id});

        if (!cat) {
            return res.status(404).json({ error: 'Category not found or not authorized' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { postCategories, updateCategories, deleteCategories, getAllCategories };