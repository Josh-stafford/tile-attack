var socket;
var playing = false;
var turn = false;
var messages=0;
var letter;
socket = io.connect('http://localhost:6061');
socket.on('playing', setup);
socket.on('attacked', attacked);
socket.on('attackMissed', missed);
socket.on('enemyHealthUpdate', enemyHealthUpd);
socket.on('enemyDead', deadEnemy);
socket.on('turn', yourTurn)
socket.on('start', start);
socket.on('useWiseUp', function(){
	player.confused = false;
	confuseBox.style.backgroundColor = '#4b3ad1';
	confuseBox.style.color = 'gray';
	socket.emit('notConfused');
	updateMsg('You use \'Wise up\' and are no longer confused.');
})

socket.on('usedWiseUp', function(){
	enemyConfuseBox.style.color = 'gray';
	enemyConfuseBox.style.backgroundColor = '#444444';
	updateMsg('Your enemy uses \'Wise Up\'.');
})

socket.on('endTurn', function(){
	updateMsg('Your turn has ended.');

	if(player.slowCountdown > 0){
		player.slowCountdown -= 1;
	}

	if(player.confuseCountdown > 0){
		player.confuseCountdown -= 1;
	}

	if(player.slowCountdown <= 0){
		player.slowed = false;
		slowBox.style.backgroundColor = '#444444';
		slowBox.style.color = 'gray';
		socket.emit('notSlowed');
		updateMsg('You are no longer slowed.');
	}

	if(player.confuseCountdown <= 0){
		player.confused = false;
		confuseBox.style.backgroundColor = '#444444';
		confuseBox.style.color = 'gray';
		socket.emit('notConfused');
		player.confuseCountdown = 4;
		updateMsg('You are no longer confused.');
	}
})
socket.on('healthBoostUsed', function(health){
	updateMsg('Your enemy regains 40hp.');
	enemyHealthUpd(health);
})
socket.on('useHBoost', function(){
	player.hp += 40;
	healthUpd(player.hp);
	updateMsg('You gain 40hp.');
	for(var i = 0; i < myBuffs.length; i++){
		if(myBuffs[i][0] == 'Health Boost'){
			console.log('Removing health boost');
			myBuffs[i][2] -= 1;
			updateMsg('You have ' + myBuffs[i][2] + ' health boosts remaining.');
			break;
		}
	}
})

socket.on('damageBoostUsed', function(){
	updateMsg('Your enemy has used a damage boost.');
})

socket.on('useDBoost', function(){

	dmgBoosted = true;
	updateMsg('Your next attack will do 20% more damage.');

})
socket.on('useCrit', function(){
	critBoosted = true;
	updateMsg('Your next move is 4x more likely to be a critical hit!');
	for(var i = 0; i < myBuffs.length; i++){
		if(myBuffs[i][0] == 'Critical Boost'){
			myBuffs[i][2] -= 1;
			console.log('Removing Critical boost')
			updateMsg('You have no more critical boosts.');
			break;
		}
	}
})
socket.on('enemySelfDamage', selfDamage);
socket.on('notSlowed', function(){
	enemySlowBox.style.backgroundColor = '#444444';
	enemySlowBox.style.color = 'gray';
	updateMsg('Your enemy is no longer slowed.');
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
	enemyConfuseBox.style.backgroundColor = '#444444';
	updateMsg('Your enemy is no longer confused.');
})

socket.on('critboost', function(){
	updateMsg('Your enemy has used a critical boost!');
})

// socket.on('start', function(){
// 	updateMsg('Your starting move.')
// })

var playerHealth;
var enemyHealth;
var player;
var ready;
var messageBox;
var slowBox;
var enemySlowBox;
var critBoosted;
var dmgBoosted;
var playerHealthNum;


var myAttacks = [];
var atkButtons = [];
var buffButtons = [];
var myBuffs = [];

function updateMsg(message){
	messages+=1;
	var msg = document.createElement('p');
	msg.innerHTML = message + '<hr/>';
	messageBox.insertBefore(msg, messageBox.firstChild);

}

function typeWriter(message, box) {
	if(letter < message.length){
	  box.innerHTML += message.charAt(letter);
	  letter++;
	  setTimeout(typeWriter, 100);
	}
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
	playerHealthNum.innerHTML = health + ' / 150';
}

function check(attack, num){
	chance = r();
	if(attack[num] && chance < 0.7){
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
