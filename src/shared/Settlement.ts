import PlayerData from "./PlayerData";
import Vertex from "./Vertex";

export default class Settlement {
	vertex: Vertex;
	owner: PlayerData | undefined;

	constructor(vertex: Vertex) {
		this.vertex = vertex;
		this.owner = undefined;
	}

	getVertex(): Vertex {
		return this.vertex;
	}

	collectResource(): void {}
}
