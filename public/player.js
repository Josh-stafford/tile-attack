class Player{

	constructor(attacks){
		this.attacks = attacks;
		this.hp = 100;
		this.confused = false;
		this.slowed = false;
		this.speed = 100;
		this.slowCountdown = 3;
		this.confuseCountdown = 3;
	}
}