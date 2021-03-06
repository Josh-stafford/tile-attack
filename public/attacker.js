function attacker(atk){

	console.log('Attacking');

	playerAttack = player.attacks[atk];

	critChance = r();

	critMaths = 0.1 / (100 /playerAttack[5]);

	if(critBoosted){
		critMaths *= 4;
		critBoosted = false;
	}

	console.log(critMaths);

	if(dmgBoosted){
		console.log('Boosted');
		boostedPlayerAttack = playerAttack;
		boostedPlayerAttack[1] *= 1.5;
		dmgBoosted = false;
		socket.emit('attack', boostedPlayerAttack);

		console.log('Attack sent.')

		updateMsg('You attacked with ' + boostedPlayerAttack[0] + ' dealing ' + boostedPlayerAttack[1] + ' damage.');

		if(player.slowCountdown > 0){
			updateMsg('You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
		}

		boostedPlayerAttack = [];

	} else if(critChance <= critMaths){

		critPlayerAttack = playerAttack;
		critPlayerAttack[1] = critPlayerAttack[1] * 2;

		socket.emit('attack', critPlayerAttack);

		console.log('Attack sent.')

		updateMsg('You attacked with ' + critPlayerAttack[0] + ' dealing ' + critPlayerAttack[1] + ' damage.');
		updateMsg('It\'s a critical hit!')

	} else {

		if(player.slowed && player.confused){

			console.log('Slowed and confused');

			chance = r();

			if(!playerAttack[4] && chance > 0.6 || playerAttack[4] && chance > 0.8){

				console.log('Missed.')

				socket.emit('missed', playerAttack);

				if(player.slowCountdown > 0){
					updateMsg('You missed with ' + playerAttack[0] + '. You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
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

				newPlayerAtk[1] = Math.ceil(newPlayerAtk[1] * atkDmg);

				updateMsg('You attacked with ' + newPlayerAttack[0] + ' dealing ' + newPlayerAttack[1] + ' damage.');

				socket.emit('attack', newPlayerAtk);

			} else {

				socket.emit('attack', playerAttack);

				console.log('Attack sent.')

				updateMsg('You attacked with ' + playerAttack[0] + ' dealing ' + playerAttack[1] + ' damage.');

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
					updateMsg('You missed with ' + playerAttack[0] + '. You are still slowed for ' + (player.slowCountdown).toString() + ' turns.')
				} else {
					updateMsg('You missed.');
				}

			} else {

				socket.emit('attack', playerAttack);

				console.log('Attack sent.')

				updateMsg('You attacked with ' + playerAttack[0] + ' dealing ' + playerAttack[1] + ' damage.');

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

				updateMsg('You attacked with ' + playerAttack[0] + ' dealing ' + playerAttack[1] + ' damage.');

				if(player.confuseCountdown > 0){
					updateMsg('You are still confused for ' + (player.confuseCountdown).toString() + ' turns.')
				}

			}

		} else {

			socket.emit('attack', playerAttack);

			console.log('Attack sent.')

			updateMsg('You attacked with ' + playerAttack[0] + ' dealing ' + playerAttack[1] + ' damage.');

		}

	}

}
