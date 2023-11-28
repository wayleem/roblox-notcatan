import Settlement from "./Settlement";
import Vertex from "./Vertex";

export default class City {
	private vertex: Vertex;

	constructor(settlement: Settlement) {
		this.vertex = settlement.getVertex();
	}

	getVertex(): Vertex {
		return this.vertex;
	}
}
