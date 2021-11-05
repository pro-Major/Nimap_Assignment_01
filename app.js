const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");
require('./models')

//Importing Time Api
const { findCountriesTimezone } = require('./controllers/currentTime')


//Importing Middlewares 
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true,
}
))


// set the view engine to ejs
app.set('view engine', 'ejs');



// View Routes
app.get('/',function (req,res){
    res.render('index')
})

app.get('/sendmail',function (req,res){
    res.render('mail')
})





//Index Route
var indexRouter = require('./routes/index');
app.use('/api', indexRouter);



module.exports = app;