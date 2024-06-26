const profModels = require('../../models/profModels');

const getAllProfs = async (req, res) => {
    try {
        const profs = await profModels.find();
        res.status(200).json(profs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {getAllProfs}