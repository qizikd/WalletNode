var createError = require('http-errors');
var express = require('express');

var usdtRouter = require('./usdt/index');
var usdtV2Router = require('./usdt/index2');

var app = express();
app.configure();
// 这个是我们上面自定义的模块
var log4js = require("./log");
app.use(log4js.useLog());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/usdt', usdtRouter);
app.use('/v2/usdt', usdtV2Router);

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

var server = app.listen(88, function () {   //监听端口
    var host = server.address().address
    var port = server.address().port
    console.log('address app listening at http://%s:%s', host, port);
})