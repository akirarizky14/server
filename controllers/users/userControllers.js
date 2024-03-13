const User = require('../../models/userModels');
const randomstring = require('randomstring'); // Import library randomstring
const bcrypt = require('bcrypt'); // Import library bcrypt untuk hashing password
const validator = require('validator'); // Import library validator untuk validasi email
const transporter = require('../../configs/otp'); // Pastikan Anda memiliki modul transporter yang sesuai dengan kebutuhan Anda

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
        
        const findEmail = await User.findOne({ email: email });
        if (findEmail) {
            return res.status(400).json("Email is already registered");
        }
        
        // Validasi email
        if (!validator.isEmail(email)) {
            return res.status(400).json("Please use the correct Email Format");
        }
        
        // Validasi password
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json("Please use a strong password");
        }
        
        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // Buat user baru
        const user = await User.create({
            full_name,
            nick_name,
            password: hashedPassword,
            email,
            roles: 'Customer',
            isEmailVerified: false,
            otp,
        });
        
        // Kirim email dengan OTP
        const mailData = {
            from: 'akirarizkyyy@gmail.com',
            to: email,
            subject: 'Your OTP for registration',
            html: `Your OTP is: ${otp}`,
        };
        
        await transporter.sendMail(mailData);
        
        res.status(200).json({ user, message: 'Mail Sent' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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

const loginUser = async (req,res) =>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        if(!user.isEmailVerified){
            return res.status(500).json({ message: 'Email need to verify the OTP' });
        }
         // Periksa apakah kata sandi yang diberikan cocok dengan yang disimpan dalam catatan pengguna
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
             return res.status(401).json({ message: 'Incorrect password' });
         }
 
         // Periksa apakah email pengguna sudah diverifikasi
         if (!user.isEmailVerified) {
             return res.status(403).json({ message: 'Email not verified' });
         }
 
         // Jika semua verifikasi berhasil, buat token otentikasi
         const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
 
         // Kirim token sebagai tanggapan
         res.status(200).json({ email,token });
    } catch (error) {
        
    }
}
module.exports = { createUser ,verifyEmail ,loginUser};
