function attacked(attack){
	console.log('Attacked');
	updateMsg('Your enemy attacks you with ' + attack[0]);
	updateMsg('You take ' + (attack[1].toString()) + ' damage.');

	if(check(attack, 2) && check(attack, 3)){


		console.log('Both');

		slowBox.style.backgroundColor = 'green';
		slowBox.style.color = 'white';

		confuseBox.style.backgroundColor = 'green';
		confuseBox.style.color = 'white';

		updateMsg('You have been both slowed and confused.');

		player.slowed = true;
		player.confused = true;

		socket.emit('slowed');
		socket.emit('confused');

	} else if(check(attack, 2)){

		player.slowed = true;

		slowBox.style.backgroundColor = 'green';
		slowBox.style.color = 'white';

		updateMsg('You have been slowed for ' + (player.slowCountdown).toString() + ' turns.');

		socket.emit('slowed');

	} else if(check(attack, 3)){

		player.confused = true;

		confuseBox.style.backgroundColor = 'green';
		confuseBox.style.color = 'white';

		updateMsg('You have become confused for ' + (player.confuseCountdown).toString() + ' turns.');

		socket.emit('confused');

	}

	player.hp -= attack[1];

	if(player.hp <= 0){

		playerHealth.style.width = '0%';

		updateMsg('You have been defeated.');

		socket.emit('dead');

	} else {

		healthUpd(player.hp);

		socket.emit('updateHealth', player.hp);
	}
}
