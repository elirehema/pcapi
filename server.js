// Import express
"use strict";
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

// Notify using the built-in convenience method
const notifier = updateNotifier({pkg, updateCheckInterval: 1000 * 60 * 60 * 24 * 7});

if (notifier.update) {
    console.log(`Update available: ${notifier.update.latest}`);
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const session = require('express-session');
const config = require('./app/config/config');
var validate = require("validate-npm-package-name");

// Import routes
const fn = '/pci/v1';
const userRoutes = require("./app/routes/route-users");
const authRoutes = require("./app/routes/route-auths");
const ordersRoute = require("./app/routes/router.orders");
const apartmentsRoute = require("./app/routes/route.computer");

const app = express();



var cors = require('cors');

var sess = {
    secret: 'fdsakhfdsjabgidshngaerniaerpbeijdskagkgsakjnk',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        expires: 0
    },

    resave: false,
    saveUninitialized: true,
};
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });

    app.set('trust proxy', 1);// trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fn, apartmentsRoute);
app.use(fn, userRoutes);
app.use(fn, authRoutes);
app.use(fn, ordersRoute);
app.use('/api/doc', express.static('docs'));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


app.get('/', function (req, res) {
    res.send(' Server started...');
    let sess = req.session;
    if (sess.username && sess.id) {
        return res.redirect('/');
    }
});


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
    connectTimeoutMS: 10000, // GiREMOTEve up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


mongoose.connect(config.REMOTE_MONGO_URI, options)
    .then(() => console.log("Connected to DataBase..."))
    .catch(err => console.error("An Error has occured", err));

var db = mongoose.connection;
db.on('open', function () { console.log('OK');});


/**   Launch app to listen to specified port **/
const server = app.listen(config.HOSTING_PORT, function () {
    console.log("Running RestHub on port " + config.HOSTING_PORT);
});
server.on('listening', function(){
console.log('Ok server is Running ...');
});


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something failed!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

/** Export server for other external modules **/
module.exports = server;
