require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Mail send route
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'w.aciolib@gmail.com',
        subject: 'Woxiee | Contato através do site',
        html: `
        <style lang="css">
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        @font-face {
            font-family: 'Open Sans', sans-serif;
            src: url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        }
    </style>

    <div style="mso-hide: all; width: 0; height: 0; overflow: hidden; display: none; opacity: 0; visibility: hidden; font-size: 0px; line-height: 0px;">“${message}”</div>
    <div style="width: 100%; display: table; margin: 0 auto; background: #F7F7F7; min-height: 100vh;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" style="width: 100%; max-width: 600px; margin: 0 auto; display: table; background: #FFF;">
            <tr align="center">
                <td>
                    <img src="https://i.ibb.co/Tcz305Q/logo.png" alt="logo" border="0" style="display: table; margin-top: 40px;">
                </td>
            </tr>
            <tr align="center">
                <td>
                    <img src="https://i.ibb.co/99TXqVf/image.png" alt="image" border="0" style="margin-top: 30px; display: table; width: 100%; max-width: 550px; height: auto;">
                </td>
            </tr>
            <tr align="center">
                <td>
                    <p style="font-weight: 600; font-size: 18px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #000; text-align: center; max-width: 420px; margin-top: 30px;">Olá, você tem uma nova mensagem de contato através do site.</p>
                    <p style="font-size: 18px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #000; text-align: center; max-width: 490px; margin-bottom: 0;">Abaixo estão as informações de contato e a mensagem:</p>
                </td>
            </tr>
            <tr align="center">
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F1F4FB" style="width: 100%; max-width: 550px; background: #F1F4FB; border-radius: 15px; margin-top: 30px;">
                        <tr align="center" valign="center">
                            <td>
                                <p style="font-size: 18px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #000; text-align: center; max-width: 490px; margin-top: 30px;">“${message}”</p>
                                <p style="font-size: 18px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #000; text-align: center; max-width: 490px; margin-bottom: 0;"><strong>${name}</strong></p>
                                <p style="text-decoration: none; font-size: 14px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #000; text-align: center; max-width: 490px; margin-top: 0; margin-bottom: 30px;">${email}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr align="center">
                <td>
                    <hr style="width: 100%; max-width: 100px; border-color: #979BEE; border-top: none; margin: 30px auto;">
                    <p style="font-size: 14px; font-family: 'Open Sans', Arial, Helvetica, sans-serif; line-height: 1.4; color: #333; opacity: .5; text-align: center; max-width: 490px; margin-bottom: 30px;">Esta é uma mensagem automática do sistema.</p>
                </td>
            </tr>
        </table>
    </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(500).json({ error: 'Faillure' });
        }
        res.status(200).json({ message: 'Success' });
    });

});

app.listen(port, () => {
    console.log('Running');
});