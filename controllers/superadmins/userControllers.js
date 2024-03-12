const User = require('../../models/userModels');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupsa = async (req, res) => {
    const { full_name, nick_name, gender, email, password, born, ads, job_positions, job_industries, countries, provinces, cities, district, photos, pass } = req.body;
    if (!email || !password || !pass) {
        return res.status(400).json({ error: "Email, password, and pass are required" });
    }
    
    try {
        let role = '';
        switch (pass) {
            case 'super':
                role = 'Admin';
                break;
            case 'mark':
                role = 'Marketing';
                break;
            case 'train':
                role = 'Trainers';
                break;
            case 'user':
                role = 'Customer';
                break;
            default:
                return res.status(401).json("Not Authorized!");
        }
        const user = await User.create({
            full_name,
            nick_name,
            gender,
            email,
            password,
            born,
            ads,
            job_positions,
            job_industries,
            countries,
            provinces,
            cities,
            district,
            roles: role,
            photos
        });
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllUser = async (req,res) =>{
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateUserById = async (req, res) => {
    const { id } = req.params; 
    const { full_name, nick_name, gender, password, born, ads, job_positions, job_industries, countries, provinces, cities, district, roles, photos } = req.body;
    
    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.full_name = full_name || user.full_name;
        user.nick_name = nick_name || user.nick_name;
        user.gender = gender || user.gender;
        user.password = password || user.password;
        user.born = born || user.born;
        user.ads = ads || user.ads;
        user.job_positions = job_positions || user.job_positions;
        user.job_industries = job_industries || user.job_industries;
        user.countries = countries || user.countries;
        user.provinces = provinces || user.provinces;
        user.cities = cities || user.cities;
        user.district = district || user.district;
        user.roles = roles || user.roles;
        user.photos = photos || user.photos;

        user = await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUserById = async (req, res) => {
    const { id } = req.params; 

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteUserById };
module.exports = { signupsa, getAllUser, updateUserById, deleteUserById };
