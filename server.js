var express = require('express');
var pCount = 0;
var players = [];
var maxPlayers = 999999;

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){

	socket.name;

	socket.playing;

	if(players.length < 1){
		socket.name = 'p1';
	} else {
		socket.name = 'p2';
	}

	console.log('New connection');
	console.log(socket.name);

	if(pCount < maxPlayers){
		socket.playing = true;
		pCount += 1;
		players.push(socket);
		console.log('A new player has joined the game');
		socket.emit('playing');
	}

	socket.on('attack', function(attack){
		console.log('Attack issued');
		if(players[pCount % 2] == socket){
			socket.broadcast.emit('attacked', attack);
			console.log('Attack: ' + attack[0] + ' has been used by ' + socket.name);
			pCount += 1;
		}
	})

	socket.on('missed', function(attack){

		console.log('Attack issued');
		if(players[pCount % 2] == socket){
			socket.broadcast.emit('attackedMissed', attack);
			console.log('Attack: ' + attack[0] + ' missed the enemy.');
			pCount += 1;
		}

	})

	socket.on('disconnect', function(){
		console.log('Disconnect');
    	if(socket.playing){
    		console.log('A player has left the game.');
    		pCount -= 1;
    	}
  	});

  	socket.on('updateHealth', function(health){
  		socket.broadcast.emit('enemyHealthUpdate', health);
  	})

  	socket.on('dead', function(){
  		console.log(socket.name + ' has died');
  		socket.broadcast.emit('enemyDead');
  	})

}