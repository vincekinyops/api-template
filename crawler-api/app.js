var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var contractTransactions = require('./routes/address/transactions');
var addressBalance = require('./routes/address/balances');
var getNfts = require('./routes/address/nfts');
var { getNFTTxByTokenId, getNFTTxByAddress, getNFTMetadataByAddress } = require('./routes/nft');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:chainId/contract/:address/transactions', contractTransactions);
app.get('/:chainId/contract/:address/nfts', getNfts);
app.get('/:chainId/contract/:address/balance', addressBalance);
app.get('/:chainId/nfts/:contract/token/:tokenid/transactions', getNFTTxByTokenId);
app.get('/:chainId/nfts/:contract/transactions', getNFTTxByAddress);
app.get('/:chainId/nfts/:contract/metadata', getNFTMetadataByAddress);

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
  res.status(err.status || 500).send(err);
});

module.exports = app;
