// require('dotenv').config();
// const nodemailer = require('nodemailer');


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
//             console.log(err);
//         }else{
//             console.log("Mail sent------------->");
//         }
//     })
// }

// module.exports =  enviarEthereal;