const nodemailer = require('nodemailer');

const sendMail = (req,res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });
        
    // mail deitails
    const mailInfo = {
        from: process.env.EMAIL, // sender address
        to: req.body.email, // list of receivers
        //cc : 'xxx@gmail.com', // cc
        //bcc: 'xxx@gmail.com', // bcc
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: `<b>Thanks for using our service</b>`, // html body,
        attachments : [
            { filename: 'picture.png', path: './public/img/picture.png' }
        ]
        }
    
    // send mail with defined transport object
    transporter.sendMail(mailInfo , (err , info) => {
        if(err){
            console.log("Error occured ",err);
            res.render('contactForm' , {message: 'Sorry there was an error occured!'});
        }else{
            console.log("Email send successfully ", info);
            res.render('contactForm' , {message: 'Email Sended Successfully!'});
        }
    });        
}

module.exports = sendMail;