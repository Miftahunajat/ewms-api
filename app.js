var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

let indexRouter = require("./routes/index");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on("connection", function(socket) {
  clients++;
  socket.on("disconnect", function() {
    clients--;
    io.sockets.emit("broadcast", {
      description: clients + " clients connected!"
    });
  });
});

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

app.post("/update", function(req, res) {
  res.status(200).send();
  var lat = req.body.lat;
  var lon = req.body.lon;
  var wh = req.body.wh;
  var id = req.body.id;
  io.sockets.emit("message", { lat: lat, lon: lon, id: id, wh: wh });
  console.log(req.body);
});

app.use(morgan("dev"));

var clients = 0;

http.listen(port, function() {
  console.log("listening on localhost:3000");
});

module.exports = app;
