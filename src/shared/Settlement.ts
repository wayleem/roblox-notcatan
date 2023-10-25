import PlayerData from "./PlayerData";
import Vertex from "./Vertex";

export default class Settlement {
	player: PlayerData;
	vertex: Vertex;

	constructor(player: PlayerData, vertex: Vertex) {
		this.player = player;
		this.vertex = vertex;
	}

	collectResource(): void {}
}
