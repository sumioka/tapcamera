
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require("fs");
var requestHandler = require("./requestHandler.js");



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

//app.get('/photo/upload', requestHandler.upload);
//app.get('/photo/show', requestHandler.show);

app.post('/upload', function(req, res) {
    //req.files.mediaはアップロードする画像の要素名
    var media = req.files.media;
    fs.rename(media.path, __dirname + "/" + 'media.png' , function(err) {
        if (err) {
            res.send(500);
        } else {
            res.send(200);
        }
    });
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
