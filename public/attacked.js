function attacked(attack){
	console.log('Attacked');
	updateMsg('Your enemy attacks you with ' + attack[0]);
	
	if(slow(attack)){
		
		player.slowed = true;

		slowBox.style.backgroundColor = 'green';
		slowBox.style.color = 'white';

		updateMsg('You have been slowed for ' + (player.countdown).toString() + ' turns.');

		socket.emit('slowed');
	
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