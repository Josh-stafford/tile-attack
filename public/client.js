var socket;
var playing = false;
var turn = false;
socket = io.connect('http://localhost:6061');
socket.on('playing', setup);
socket.on('attacked', attacked);
socket.on('attackMissed', missed);
socket.on('enemyHealthUpdate', enemyHealthUpd);
socket.on('enemyDead', deadEnemy);
socket.on('turn', yourTurn)
socket.on('start', start);
socket.on('useCrit', function(){
	critBoosted = true;
	updateMsg('Your next move is 4x more likely to be a critical hit!');
})
socket.on('enemySelfDamage', selfDamage);
socket.on('notSlowed', function(){
	enemySlowBox.style.backgroundColor = '#4b3aa5';
	enemySlowBox.style.color = 'gray';
})

socket.on('enemySlowed', function(){
	enemySlowBox.style.backgroundColor = 'red';
	enemySlowBox.style.color = 'white';
})

socket.on('enemyConfused', function(){
	enemyConfuseBox.style.color = 'white';
	enemyConfuseBox.style.backgroundColor = 'red';
})

socket.on('enemyNotConfused', function(){
	enemyConfuseBox.style.color = 'gray';
	enemyConfuseBox.style.backgroundColor = '#4b3aa5';
})

socket.on('critboost', function(){
	updateMsg('Your enemy has used a critical boost!');
})

// socket.on('start', function(){
// 	updateMsg('Your starting move.')
// })

var atk1;
var atk2;
var atk3;
var atk4;
var playerHealth;
var enemyHealth;
var player;
var ready;
var messageBox;
var slowBox;
var enemySlowBox;
var critBoosted;
var dmgBoosted;


var myAttacks = [];
var atkButtons = [];
var buffButtons = [];
var myBuffs = [];

function setup(){
	for(var i = 0; i < 4; i++){
		atkButtons[i] = document.getElementById('atk' + (i+1));
	}

	for(var i = 0; i < 8; i++){
		buffButtons[i] = document.getElementById('buff' + (i+1));
	}

	playerHealth = document.getElementById('bar1Fill');
	enemyHealth = document.getElementById('bar2Fill');
	messageBox = document.getElementById('textbox');
	slowBox = document.getElementById('slowPlayer');
	enemySlowBox = document.getElementById('slowEnemy');
	confuseBox = document.getElementById('confusePlayer');
	enemyConfuseBox = document.getElementById('confuseEnemy');

	for(var i = 0; i < 4; i++){
		attack = attacks[Math.floor(Math.random()*attacks.length)];
		myAttacks.push(attack);
		attacks.splice(attacks.indexOf(attack), 1);

	}

	for(var i = 0; i < 5; i++){
		buff = buffs[Math.floor(Math.random()*buffs.length)];
		myBuffs.push(buff);
		buffs.splice(buffs.indexOf(buff), 1);
	}

	player = new Player(myAttacks);

	for(var i = 0; i < atkButtons.length; i++){
		atkButtons[i].innerHTML = myAttacks[i][0];
	}

	for(var i = 0; i < myBuffs.length; i++){
		console.log(myBuffs[i][0]);
		buffButtons[i].innerHTML = myBuffs[i][0];
	}

	console.log('Done');

}

function updateMsg(message){
	messageBox.innerHTML= '<p>' + message + '</p>' + '<hr/>' + messageBox.innerHTML
}

function missed(attack){
	console.log('Enemy missed.');
	updateMsg('Your enemy missed you with ' + attack[0] + '.');
}

function enemyHealthUpd(health){
	enemyHealth.style.width = (health/1.5).toString() + '%';
}

function healthUpd(health){
	playerHealth.style.width = (health/1.5).toString() + '%';	
}

function check(attack, num){
	chance = r();
	if(attack[num] && chance > 0.6){
		return true;
	} else {
		console.log(chance);
		return false;
	}
}


function r(){
	return Math.random();
}

function deadEnemy(){
	enemyHealth.style.width='0%';
	updateMsg('Your enemy has been successfully defeated!');
}

function yourTurn(){
	updateMsg('It\'s your turn.');
	if(player.slowed){
		player.slowCountdown -= 1;
	}

	if(player.confused){
		player.confuseCountdown -= 1;
	}
}

function start(){
	console.log('Restarting');
	location.reload();
}

function selfDamage(health){
	updateMsg('In their confusion, your enemy damages themselves.');
	enemyHealthUpd(health);
}