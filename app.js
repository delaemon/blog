
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js');

log4js.configure('./config/log.conf');
var logger = log4js.getLogger("dateFile");

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next) {
  logger.info([
    req.headers['x-forwarded-for'] || req.client.remoteAddress,
    new Date().toLocaleString(),
    req.method,
    req.url,
    res.statusCode,
    req.headers.referer || '-',
    req.headers['user-agent'] || '-'
    ].join('\t')
  );
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/page/:page([0-9]+)', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  process.setuid(80);
  console.log('Express server listening on port ' + app.get('port'));
});

