var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = {
	add(req, res) {

		io.sockets.emit('broadcast',{ message: req.body.message});

		return res.status(200).send("Success")
		.catch((error) => res.status(400).send(error));
	},


};
