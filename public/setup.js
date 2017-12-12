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
	playerHealthNum = document.getElementById('playerHealthNum');

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

	healthUpd(player.hp);

	console.log('Done');

}
