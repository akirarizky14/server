const courseModels = require('../../models/courseModels');
const userModels = require('../../models/userModels');
const catModels = require('../../models/catModels');

const createCourse = async (req, res) => {
    try {
        const { cat_type, title, photos, video, description, price, stars, thumbnail, file,difficulty } = req.body;
        const { _id: user_id } = req.user; 
        const checkName = await userModels.findOne({_id : user_id});
        if (!checkName) {
            return res.status(404).json({ error: 'User not found' });
        }
        const checkCat = await catModels.findOne({ name_cat: cat_type });
        console.log(checkCat)
        if (!checkCat) {
            return res.status(400).json({ error: 'Category does not exist' });
        }
        const course = await courseModels.create({
            cat_type:checkCat.name_cat,
            user_id,
            title,
            photos,
            video,
            description,
            price,
            stars,
            thumbnail,
            file,
            created_at: Date.now(),
            created_by: checkName.full_name,
            difficulty : difficulty
        });

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModels.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req,res) =>{
    try {
        const {id} = req.params;
        const course = await courseModels.findById(id)
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCourseByUser = async (req, res) => {
    try {
        const { id } = req.params; // ID pengguna
        const courses = await courseModels.find({ user_id: id }); 
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModels.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, photos, video, description, price, stars, thumbnail, file } = req.body;
        
        const updatedData = {
            title,
            photos,
            video,
            description,
            price,
            stars,
            thumbnail,
            file
        };

        const course = await courseModels.findByIdAndUpdate(id, updatedData, { new: true });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createCourse ,getAllCourses, getCourseById, getCourseByUser, deleteCourseById, updateCourseById};
