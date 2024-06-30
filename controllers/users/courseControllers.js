const courseModels = require('../../models/courseModels');
const catModels = require('../../models/catModels');

const getCourseByCategories = async(req, res) => {
    try {
        const { categoryId } = req.params;
        const checkCat = await catModels.findById(categoryId);
        if (!checkCat) {
            throw Error("Category Not Found");
        }
        const checkCourse = await courseModels.find({cat_type : checkCat.name_cat})
        if(!checkCourse){
            throw Error("Course Not Found");
        }
        
        res.status(200).json(checkCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


const getCourseByLevel = async (req, res) => {
    const { difficulty } = req.params;
    try {
        const courses = await courseModels.find({ difficulty });
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch courses by level' });
    }
};

const getCourseForEvents = async(req, res) => {
    try {
        const checkCourse = await courseModels.find({events:true})
        if(!checkCourse){
            throw Error("Course Not Found");
        }
        res.status(200).json(checkCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getCourseByCategories,getCourseForEvents,getCourseByLevel };
