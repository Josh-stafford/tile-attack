socket.on('playing', setup);
socket.on('attacked', attacked);
socket.on('attackMissed', missed);
socket.on('enemyHealthUpdate', enemyHealthUpd);
socket.on('enemyDead', deadEnemy);
socket.on('turn', yourTurn)
socket.on('start', start);
socket.on('enemySelfDamage', selfDamage);
socket.on('notSlowed', function(){
	enemySlowBox.style.backgroundColor = '#4b3aa5';
	enemySlowBox.style.color = 'gray';
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
	enemyConfuseBox.style.backgroundColor = '#4b3aa5';
})

socket.on('critboost', function(){
	updateMsg('Your enemy has used a critical boost!');
})