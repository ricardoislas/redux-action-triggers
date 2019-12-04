#!/usr/bin/env node

const path = require('path');
var express=require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//-----------------------------------------------------------------------------

var port= Number(process.argv[2]);
port = !isNaN(port) ? port : 8080;

//-----------------------------------------------------------------------------

app.use('/', express.static(path.resolve(__dirname, 'app')));


http.listen(port, function(){
	console.log('Listening on *:'+port);
});


io.on('connection', function(socket){

	//Events from tested app
	socket.on("updateConfiguration", (configuration) => {
		console.log("Update Configuration");
		socket.broadcast.emit("updateConfiguration", configuration);
	})

	//Events from UI
	socket.on("dispatch", ({actionCreatorName, parameters}) => {
		console.log(`Dispatch: ${actionCreatorName}`);
		socket.broadcast.emit("dispatch", {
			actionCreatorName,
			parameters
		});
	})

	socket.on("requestConfiguration", () => {
		console.log("Request configuration");
		socket.broadcast.emit("requestConfiguration");
	})

});


