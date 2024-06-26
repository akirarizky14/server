const profModels = require('../../models/profModels');
const userModels = require('../../models/userModels');

const postProf = async (req, res) => {
    const { _id: user_id } = req.user; 
    const checkName = await userModels.findOne({ _id: user_id });
    
    if (!checkName) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (checkName.roles !== 'Admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { title } = req.body;
        const pict = req.file ? req.file.path.replace(/\\/g, '/') : null;  // Corrected the access to req.file
        const prof = await profModels.create({
            title: title,
            pict: pict,
            post_time: Date.now(),
            post_by: checkName.full_name
        });
        res.status(200).json(prof);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getAllProfs = async (req, res) => {
    try {
        const profs = await profModels.find();
        res.status(200).json(profs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getProfById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const prof = await profModels.findById(id);
        if (!prof) {
            return res.status(404).json({ error: 'Prof not found' });
        }
        res.status(200).json(prof);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateProf = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const pict = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try {
        const prof = await profModels.findById(id);
        if (!prof) {
            return res.status(404).json({ error: 'Prof not found' });
        }

        prof.title = title || prof.title;
        if (pict) prof.pict = pict;

        await prof.save();
        res.status(200).json(prof);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteProf = async (req, res) => {
    const { id } = req.params;

    try {
        const prof = await profModels.findById(id);
        if (!prof) {
            return res.status(404).json({ error: 'Prof not found' });
        }

        await profModels.deleteOne({ _id: id });
        res.status(200).json({ message: 'Prof deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { postProf, getAllProfs, getProfById, updateProf ,deleteProf};
