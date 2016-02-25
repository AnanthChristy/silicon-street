var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');
});


io.on('connection',function(socket){
	socket.broadcast.emit('chat message','a user connected');
	socket.on('chat message',function(msg){
	console.log('message: '+msg);
	io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		var spade='user disconnected';
		socket.broadcast.emit('chat message', spade);
	});
});



var port = Number(process.env.PORT || 8082);
http.listen(port,function(){
	console.log('Server is listening');
});

