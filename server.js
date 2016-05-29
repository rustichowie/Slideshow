var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/routes');
var port = process.env.PORT || 8080;
var http = require('http').Server(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);


http.listen(port, function(){
  console.log('');
});
