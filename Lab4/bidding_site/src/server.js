const express = require("express");
const fileUpload = require('express-fileupload');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var fs = require('fs')
var https = require('https')
var debug = require('debug')('https')


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password,cb) {
    db.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.name);
});

passport.deserializeUser(function(id, cb) {
  db.findByUsername(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


let server = express();

// enable files upload
server.use(fileUpload({
  createParentPath: true
}));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(require('morgan')('combined'));
server.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


// Initialize Passport and restore authentication state, if any, from the
// session.
server.use(passport.initialize());
server.use(passport.session());

const routes = require("./routes");
server.set('view engine','pug');
server.set('views','./src');
server.use(express.static('public'));
server.use(express.static('node_modules/socket.io-client/dist'));
server.use("/",routes);

https.createServer({
  key: fs.readFileSync('./cert/cert.key'),
  cert: fs.readFileSync('./cert/cert.csr')
}, server)
.listen(3000, function () {
    debug('listening');
})
// server.listen(3000);