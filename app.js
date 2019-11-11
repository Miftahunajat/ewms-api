var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const morgan = require('morgan');
const port = process.env.PORT || 5000;

let indexRouter = require('./routes/index');

io.on('connection', function(socket) {
   clients++;
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.get('/update', function(req, res) {
   res.status(200).send()
   io.sockets.emit('message',{ message: req.query.message});
});


app.use(morgan('dev'));

var clients = 0;


http.listen(port, function() {
   console.log('listening on localhost:3000');
});


module.exports = app;
