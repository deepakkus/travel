var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require("mongoose");
require('dotenv').config();
var app = express();
var indexRouter = require('./routes/index');
mongoose.connect(process.env.MONGOURL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });
	



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


const splite = (items, splite_data) => {
    var scanResults = {};
    Object.keys(items).forEach(async function (index) {
        if (splite_data != index) {
            scanResults[index] = items[index];
        }
    });
    return scanResults;
};
app.use((req, res, next) => {
    req.splite = splite;
    next();
})

app.use('/', indexRouter);
app.listen(8090, () => {
  console.log("Server is running on port 8090.");
});

module.exports = app;