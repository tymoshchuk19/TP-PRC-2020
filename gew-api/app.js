var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var gamesRouter = require('./routes/games');
var usersRouter = require('./routes/users');
var genresRouter = require('./routes/genres');
var developersRouter = require('./routes/developers');
var platformsRouter = require('./routes/platforms');
var filesRouter = require('./routes/files');

var slugs = require('./config/slugs')

var app = express();

//CORS
var cors = require('cors')
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}

slugs.loadLaunched()
slugs.loadUpcoming()
slugs.loadTBA()

app.use(cors(corsOpts))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/developers', developersRouter);
app.use('/platforms', platformsRouter);
app.use('/genres', genresRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/', gamesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
