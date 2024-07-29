const express = require('express');
require('dotenv').config();

const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')


const cors = require('cors');

const nodemailer = require('nodemailer');


const app = express();
app.use(cors());
app.use(express.json());


function sendMail(name , email , message){

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const subject ='Mail Regarding Feedback'
    const to = email 
    const from = process.env.EMAIL
    const template = handlebars.compile(fs.readFileSync(path.join(__dirname,'templates/', 'feedback.hbs'), 'utf8'))
    const html=template({Name: name, message: message})
    const mailOptions ={
        from,
        to, subject,
        html
    }

    transporter.sendMail(mailOptions, (error)=>{
        if(error){
            console.log(error);
        }else{
            console.log('mail send');
        }


    })

}


app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    sendMail(name,email,message);
    res.json('mail send')
   



 

});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
