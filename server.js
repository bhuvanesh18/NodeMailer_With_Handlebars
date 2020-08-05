// packages
const express = require('express');
const expresshandlebars = require('express-handlebars');
const dotenv = require('dotenv');
const sendMail = require('./routes/sendMail');

// config .env files
dotenv.config( { path : './config/config.env' } )

// creating app
const app = express();

// view engine setup
app.engine('handlebars' , expresshandlebars({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/"
  }));
app.set('view engine','handlebars')

// body parsing
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.get('/',(req,res) => {
    res.render('contactForm');
})

app.post('/send',(req,res) => {
    sendMail(req,res);
})

// env variables
const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

// running app
app.listen(PORT , () => {
    console.log(`Server is running on ${PORT} on ${MODE} mode`);
})