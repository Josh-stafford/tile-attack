function applyBuff(num){
	buff = myBuffs[num];
	if(buff[2] > 0){
		if(buff[0] == 'Critical Boost'){
			socket.emit('critboost');
		} else if (buff[0] == 'Health Boost'){
			socket.emit('healthBoost', player.hp);
		} else if (buff[0] == 'Damage Boost'){
			dmgBoosted = buff[1];
			updateMsg('Your damage is 20% more on your next go.');

			//Send buffs to enemy
		} else if (buff[0] == 'Wise up'){
			socket.emit('wiseUp');
		}
	} else {
		updateMsg('You have no more ' + buff[0] + ' buffs.');
	}
}
