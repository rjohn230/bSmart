const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
//const bluebird = require('bluebird');
const config = require('./config/database');

/*TODO: Mongoose+bluebird promises
const db = require('./config/database');
mongoose.Promise = bluebird
mongoose.connect(db.mongoURI, {
	useMongoClient: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
*/
// Connect To Database (OLD CODE)
mongoose.connect(config.database, {useNewUrlParser: true});
// On Connection
mongoose.connection.on('connected', () => {

  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

var index = require('./routes/indexroute');
var users = require('./routes/usersroute');
var transactions = require('./routes/transactionsroute')
var api = require('./routes/apiroute');

const app = express();

const port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//express body parsing middlware
express.urlencoded({extended:false})

/*TODO: Need to do authentication
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
*/
//cookie parsing
app.use(cookieParser());

//front end goes here
app.use(express.static(path.join(__dirname, 'src')));

//some basic routing I think
//require('./config/passport')(passport);
app.use('/', index);
app.use('/users', users);
app.use('/transactions', transactions);
app.use('/api', api);

//error route
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//listening
app.listen(port, function() {
	console.log('Server started on localhost:'+port);
});

module.exports = app;
