export default class Road {
	player: Player;

	constructor(player: Player) {
		this.player = player;
	}

	getPlayer(): Player {
		return this.player;
	}
}
