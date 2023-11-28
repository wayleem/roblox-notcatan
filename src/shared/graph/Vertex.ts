import Edge from "./Edge";

export default class Vertex {
	private position: Vector3;
	private edges: Edge[];
	private building: string;
	private part: Part | undefined;

	constructor(position: Vector3) {
		this.position = position;
		this.edges = [];
		this.building = "";
		this.part = undefined;
	}
	getPosition(): Vector3 {
		return this.position;
	}

	getEdges(): Edge[] {
		return this.edges;
	}

	getBuilding(): string {
		return this.building;
	}

	getPart(): Part | undefined {
		return this.part;
	}

	addEdge(edge: Edge): Edge[] {
		this.edges.push(edge);
		return this.edges;
	}

	setPart(part: Part) {
		this.part = part;
	}
}
