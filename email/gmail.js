// // require('dotenv').config();
// // const nodemailer = require('nodemailer');
// let { loggerInfo, loggerError } = require('../utils/logs');

// const transporter = nodemailer.createTransport({
//     host: 'gmail',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL_GMAIL,
//         pass: process.env.GMAIL_PWORD
//     }
// });
// (async() => {
//     const options = {
//         From: "ShopApp",
//         to: process.env.EMAIL_GMAIL,
//         subject: "Nuevo registro",
//         html:'<h1>Test desde app node</h1>'
//     }
//     try {
//         const resp = await transporter.sendMail(options);
//         loggerInfo.info("respuesta",resp);
//     } catch (err) {
//         loggerError.error(err);
//     }
// })();