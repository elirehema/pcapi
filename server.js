const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors'); 
const app = express();
const User = require('./app/models/user');

const config = require('./config');
/** Connect to Mongoose and set connection variable **/
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

dotenv.config();


//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
//require apis
const productRoutes = require('./app/routes/product');
const categoryRoutes = require('./app/routes/category');
const ownerRoutes = require('./app/routes/owner');
const userRoutes = require('./app/routes/auth');
const reviewRoutes = require('./app/routes/review');
const addressRoutes = require('./app/routes/address');
const paymentRoutes = require('./app/routes/payment');
const orderRoutes = require('./app/routes/order');
const searchRoutes = require('./app/routes/search');

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", userRoutes);
app.use("/api", reviewRoutes);
app.use("/api", addressRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", searchRoutes);

if(process.env.NODE_ENV === 'production'){
    app.get(/.*/);
}
app.get('/', function (req, res) {
    res.send({response:'Api started succesfully...'});
    
  
});
app.get('/api', function (req, res) {
    res.send({response:'About to consume api\'s...'});
   
});
mongoose.connect(config.REMOTE_MONGO_URI, options)
    .then(()=> console.log("Connected to DataBase..."))
    .catch(err => console.error("An Error has occured", err));

var db = mongoose.connection;
db.on('open', function () {
    console.log('OK');
});


const server = app.listen(config.HOSTING_PORT, function () {
    console.log("Running RestHub on port " + config.HOSTING_PORT);
});

module.exports = server;