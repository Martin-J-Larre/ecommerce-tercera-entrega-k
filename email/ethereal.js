// require('dotenv').config();
// const nodemailer = require('nodemailer');
// let { loggerInfo, loggerError } = require('../utils/logs');


// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL_ADMIN,
//         pass: process.env.EMAIL_PWORD
//     }
// });

// const enviarEthereal = (email, asunto, mensaje) => {
//     const mailOptions ={
//         from: 'Servidor Node.js',
//         to: email,
//         subject: asunto,
//         html: mensaje
//     }

//     transporter.sendMail(mailOptions, (err, info) => {
//         if(err) {
//             loggerError.error(err);
//         }else{
//             loggerInfo.info("Mail sent------------->");
//         }
//     })
// }

// module.exports =  enviarEthereal;