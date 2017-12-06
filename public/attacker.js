function attacker(atk){

	console.log('Attacking');

	playerAttack = player.attacks[atk];

	if(player.slowed){

		console.log('Slowed')

		chance = r();

		console.log(chance);

		if(chance > 0.6){

			console.log('Missed.')

			socket.emit('missed', playerAttack);

			updateMsg('You missed. You are still slowed for ' + (player.countdown).toString() + ' turns.')

		} else {

			socket.emit('attack', playerAttack);

			console.log('Attack sent.')

			updateMsg('You attacked with ' + playerAttack[0] + '.')


		}	

	} else {

		socket.emit('attack', playerAttack);

		console.log('Attack sent.')

		updateMsg('You attacked with ' + playerAttack[0] + '.')

	}

	if(player.countdown <= 0){
		player.slowed = false;
		slowBox.style.backgroundColor = '#4b3ad1';
		slowBox.style.color = 'gray';
		socket.emit('notSlowed');
		player.countdown = 3;
	}

}