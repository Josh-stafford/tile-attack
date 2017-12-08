function attacker(atk){

	console.log('Attacking');

	playerAttack = player.attacks[atk];

	if(dmgBoosted){
		playerAttack[1] *= dmgBoosted;
		dmgBoosted = false;
	}

	critChance = r();

	critMaths = 0.1 / (100 /playerAttack[5])

	if(critBoosted){
		critMaths *= 4;
		critBoosted = false;
	}

	console.log(critMaths);

	if(critChance <= critMaths){

		critPlayerAttack = playerAttack;
		critPlayerAttack[1] = critPlayerAttack[1] * 2;

		socket.emit('attack', critPlayerAttack);

		console.log('Attack sent.')

		updateMsg('You attacked with ' + playerAttack[0] + '.')
		updateMsg('It\'s a critical hit!')

	} else {

		if(player.slowed && player.confused){

			console.log('Slowed and confused');

			chance = r();

			if(!playerAttack[4] && chance > 0.6 || playerAttack[4] && chance > 0.8){

				console.log('Missed.')

				socket.emit('missed', playerAttack);

				if(player.slowCountdown > 0){
					updateMsg('You missed. You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
				} else {
					updateMsg('You missed.');
				}
			} else if(chance >= 0.9){

				console.log('Damaged self.');

				player.hp -= (playerAttack[1]/2);

				updateMsg('In your confusion, you slightly damage yourself.');

				socket.emit('selfDamage', player.hp);

			} else if(chance > 0.6){

				console.log('Less damage');

				atkDmg = r();

				newPlayerAtk = playerAttack;

				newPlayerAtk[1] = newPlayerAtk[1] * atkDmg;

				socket.emit('attack', newPlayerAtk);

			} else {

				socket.emit('attack', playerAttack);

				console.log('Attack sent.')

				updateMsg('You attacked with ' + playerAttack[0] + '.')
				
				if(player.slowCountdown > 0){
					updateMsg('You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
				}
			}

		} else if(player.slowed){

			console.log('Slowed')

			chance = r();

			console.log(chance);

			if(!playerAttack[4] && chance > 0.6 || playerAttack[4] && chance > 0.8){

				console.log('Missed.')

				socket.emit('missed', playerAttack);

				if(player.slowCountdown > 0){
					updateMsg('You missed. You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
				} else {
					updateMsg('You missed.');
				}

			} else {

				socket.emit('attack', playerAttack);

				console.log('Attack sent.')

				updateMsg('You attacked with ' + playerAttack[0] + '.')
				
				if(player.slowCountdown > 0){
					updateMsg('You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
				}


			}

		} else if(player.confused){

			console.log('Confused');

			chance = r();

			if(chance >= 0.9){

				console.log('Damaged self.');

				player.hp -= (playerAttack[1]/2);

				updateMsg('In your confusion, you slightly damage yourself.');

				socket.emit('selfDamage', player.hp);

			} else if(chance > 0.6){

				console.log('Less damage');

				atkDmg = r();

				if(atkDmg < 0.5){
					atkDmg = 0.5;
				}

				newPlayerAtk = playerAttack;

				newPlayerAtk[1] = Math.ceil(newPlayerAtk[1] * atkDmg);

				socket.emit('attack', newPlayerAtk);

			} else {

				socket.emit('attack', playerAttack);

				console.log('Attack sent.')

				updateMsg('You attacked with ' + playerAttack[0] + '.')
				
				if(player.confuseCountdown > 0){
					updateMsg('You are still confused for ' + (player.confuseCountdown).toString() + ' turns.')
				}

			}

		} else {

			socket.emit('attack', playerAttack);

			console.log('Attack sent.')

			updateMsg('You attacked with ' + playerAttack[0] + '.')

		}

		if(player.slowCountdown <= 0){
			player.slowed = false;
			slowBox.style.backgroundColor = '#4b3ad1';
			slowBox.style.color = 'gray';
			socket.emit('notSlowed');
			player.slowCountdown = 3;
			updateMsg('You are no longer slowed.');
		}

		if(player.confuseCountdown <= 0){
			player.confused = false;
			confuseBox.style.backgroundColor = '#4b3ad1';
			confuseBox.style.color = 'gray';
			socket.emit('notConfused');
			player.confuseCountdown = 3;
			updateMsg('You are no longer confused.');
		}

	}

}