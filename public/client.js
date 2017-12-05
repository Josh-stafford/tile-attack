var socket;
var playing = false;
var turn = false;
socket = io.connect('http://172.20.12.112:3000');
socket.on('playing', setup);
socket.on('turn', turn = true);
socket.on('attacked', attacked);
socket.on('enemyHealthUpdate', healthUpd);
socket.on('enemyDead', deadEnemy);
socket.on('attackMissed', missedAtk);

var atk1;
var atk2;
var atk3;
var atk4;
var playerHealth;
var enemyHealth;
var player;
var ready;
var messageBox;

attacks = [
	// Name,Damage,Slow,Confuse,Fast
	['Slash', 35, false, false, true],
	['Tackle', 28, false, true, true],
	['Mankelow', 20, false, true, true],
	['Ankle-kick', 10, true, false, true],
	['Scissor kick', 50, false, false],
	['Insult', 31, false, false, true],
	['Dance', 15, true, true, true],
	['Big enough', 41, true, false, false]
];

myAttacks = []
atkButtons = []

function setup(){
	for(var i = 0; i < 4; i++){
		atkButtons[i] = document.getElementById('atk' + (i+1));
	}

	playerHealth = document.getElementById('bar1Fill');
	enemyHealth = document.getElementById('bar2Fill');
	messageBox = document.getElementById('messageBox');

	for(var i = 0; i < 4; i++){
		attack = attacks[Math.floor(Math.random()*attacks.length)];
		myAttacks.push(attack);
		attacks.splice(attacks.indexOf(attack), 1);

	}

	player = new Player(myAttacks);

	for(var i = 0; i < atkButtons.length; i++){
		atkButtons[i].innerHTML = myAttacks[i][0];
	}

}

function updateMsg(message){
	messageBox.innerHTML=message;
}

function healthUpd(health){
	enemyHealth.style.width = health.toString() + '%';
}

function slow(attack){
	if(attack[2]){
		return true;
	} else {
		return false;
	}
}

function r(){
	return Math.floor(Math.random());
}

function attacker(atk){

	playerAttack = player.attacks[atk];

	if(player.slowed){

		chance = r();

		if(chance > 0.5){

			socket.emit('missed', playerAttack);

			player.countdown -= 1;

		}	

	} else {

		socket.emit('attack', playerAttack);

		player.countdown -= 1;

	}

	if(player.countdown <= 0){
		player.slowed = false;
	}

}

function attacked(attack){
	console.log('Attacked');
	updateMsg('Your enemy attacks you with ' + attack[0]);
	player.hp -= attack[1];
	if(player.hp <= 0){
		playerHealth.style.width = '0%';
		socket.emit('dead');
	} else {
		playerHealth.style.width = (player.hp).toString() + '%'
		socket.emit('updateHealth', player.hp);
	}
}

function deadEnemy(){
	enemyHealth.style.width='0%';
}

function missedAtk(attack){
	updateMsg('The enemy tried to attack you with ' + attack + ' but missed.');
}