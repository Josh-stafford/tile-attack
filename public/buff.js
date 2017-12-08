function applyBuff(num){
	buff = myBuffs[num];

	if(buff[0] == 'Critical Boost'){
		critBoosted = true;
		updateMsg('You have 4 times the chance of a critical hit on your next go.');
	} else if (buff[0] == 'Health Boost'){
		player.hp += buff[1];
		updateMsg('You regain 40hp.');
	} else if (buff[0] == 'Damage Boost'){
		dmgBoosted = buff[1];
		updateMsg('Your damage is 20% more on your next go.');

		//Send buffs to enemy
	}
}