const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: 'akirarizkyyy@gmail.com',
        pass: 'fcxtnjblmcpwhxtu',
    },
    secure: false,
    debug: true, 
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Transporter is ready to take our messages');
    }
});

module.exports = transporter;