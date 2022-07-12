var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var personsRouter = require('./routes/persons');
var contractTransactions = require('./routes/contract/transactions');
var contractBalance = require('./routes/contract/balance');
var getNfts = require('./routes/contract/nfts');
var nftTransactions = require('./routes/nft/transactions');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/persons', personsRouter);
app.get('/:chainId/contract/:address/transactions', contractTransactions);
app.get('/:chainId/contract/:address/nfts', getNfts);
app.get('/:chainId/contract/:address/balance', contractBalance);
app.get('/:chainId/nfts/:contract/token/:tokenid/transactions', nftTransactions);

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
