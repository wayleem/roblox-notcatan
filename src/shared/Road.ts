import Edge from "./Edge";

export default class Road {
	edge: Edge;
	constructor(edge: Edge) {
		this.edge = edge;
	}

	getEdge(): Edge {
		return this.edge;
	}
}
