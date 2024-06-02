const User = require('../../models/userModels');
const randomstring = require('randomstring'); // Import library randomstring
const bcrypt = require('bcrypt'); // Import library bcrypt untuk hashing password
const validator = require('validator'); // Import library validator untuk validasi email
const transporter = require('../../configs/otp'); // Pastikan Anda memiliki modul transporter yang sesuai dengan kebutuhan Anda
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const generateOTP = () => {
    return randomstring.generate({
      length: 6,
      charset: 'numeric',
    });
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const createUser = async (req, res) => {
    const { full_name, nick_name, password, email } = req.body;
    
    try {
        const otp = generateOTP();
        if(!email || !password || !nick_name || !full_name){
            throw Error('All fields must be filled')
        }
        const findEmail = await User.findOne({ email: email })
            
        if (findEmail) {
            throw Error('Email is already registered Please Login')
        }
        
        if (!validator.isEmail(email)) {
            throw Error("Please use the correct Email Format");
        }
        
        if (!validator.isStrongPassword(password)) {
            throw Error("Please create a password that is at least 8 characters long and contains a combination of uppercase and lowercase letters, along with symbols, to enhance security.");
        }
        
        const hashedPassword = await hashPassword(password);
        
        const user = await User.create({
            full_name,
            nick_name,
            password: hashedPassword,
            email,
            roles: 'Customer',
            isEmailVerified: false,
            otp,
        });
        
        const mailData = {
            from: 'akirarizkyyy@gmail.com',
            to: email,
            subject: 'Your OTP for registration',
            html: `Your OTP is: ${otp}`,
        };
        
        await transporter.sendMail(mailData);

        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


const verifyEmail = async (req, res) => {
    const { email , otp} = req.body;

    try {
        const user = await User.findOne({ email : email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(otp !== user.otp){
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.isEmailVerified = true;

        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.isEmailVerified) {
            throw new Error('Email need to verify the OTP');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDataById = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createUser, verifyEmail, loginUser, getDataById };

