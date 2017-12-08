var express = require('express');
var pCount = 0;
var players = [];
var maxPlayers = 2;
var playing = true;

var app = express();
var server = app.listen(6061);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){

	socket.name;

	socket.playing;

	socket.alive = true;

	if(players.length < 1){
		socket.name = 'Player 1';
	} else {
		socket.name = 'Player 2';
	}

	// console.log('New connection');
	// console.log(socket.name);

	if(players.length < maxPlayers){
		socket.playing = true;
		pCount += 1;
		players.push(socket);
		console.log(socket.name + ' has joined the game');
		socket.emit('playing');
	}

	if(playing){

		socket.on('notSlowed', function(){
			socket.broadcast.emit('notSlowed');
		})

		socket.on('attack', function(attack){

			console.log('Attack issued');
			if(players[pCount % 2] == socket){
				socket.broadcast.emit('attacked', attack);
				console.log('Attack: ' + attack[0] + ' has been used by ' + socket.name);
				pCount += 1;
				nextTurn(socket);
			}
		})

		socket.on('missed', function(attack){

			console.log('Attack issued');
			if(players[pCount % 2] == socket){
				socket.broadcast.emit('attackMissed', attack);
				console.log('Attack: ' + attack[0] + ' missed the enemy.');
				pCount += 1;
				nextTurn(socket);
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
	  		playing = false;
	  		console.log(socket.name + ' has died');
	  		socket.broadcast.emit('enemyDead');
	  		// restart(socket);
	  	})

	  	socket.on('slowed', function(){
	  		console.log(socket.name + ' has been slowed.');
	  		socket.broadcast.emit('enemySlowed');
	  	})

	  	socket.on('confused', function(){
	  		console.log(socket.name + ' has become confused.');
	  		socket.broadcast.emit('enemyConfused');
	  	})

	  	socket.on('notConfused', function(){
	  		console.log(socket.name + ' is no longer confused.');
	  		socket.broadcast.emit('enemyNotConfused');
	  	})

	  	socket.on('selfDamage', function(health){
	  		console.log(socket.name + ' damaged themselves.');
	  		socket.broadcast.emit('enemySelfDamage', health);
	  		nextTurn();
	  	})

	  	socket.on('critboost', function(){
	  		if(players[pCount%2] == socket){
	  			console.log(socket.name + ' has used a critical boost.');
	  			socket.emit('useCrit');
	  			socket.broadcast.emit('critboost');
	  			pCount += 1;
	  			nextTurn(socket);
	  		}

	  	})

	  	socket.on('healthBoost', function(health){
	  		console.log(socket.name + ' has used a health boost.');
	  	})

  	}

}

function nextTurn(socket){
	if(playing){
		//console.log(players[pCount%2].name + '\'s turn.')
		console.log('Next turn');
		socket.broadcast.emit('turn');
	}
}

// function restart(socket){
// 	players = [];
// 	pCount = 0;
// 	io.sockets.emit('start');
// 	console.log('Starting');
	// playing = true;

// }